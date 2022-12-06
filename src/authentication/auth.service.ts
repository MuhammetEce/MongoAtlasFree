import { automapper } from '../base/helpers/Mapper';
import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Tokens } from './interfaces/Credentials';
import { UserService } from '../user/user.service';
import { BcryptHasher } from '../base/hash.password.bcryptjs';
import { IUser } from '../user/interfaces/User';
import { RegisterDTO, LoginDTO } from './dto/auth.dto';
import { GetProfileDTO } from '../user/dto/user.dto';
import { catchHandler } from '../base/helpers/exception';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private bcryptHasher: BcryptHasher,
  ) {}

  async register(body: RegisterDTO): Promise<Tokens> {
    try {
      const existsEmail = await this.userService.findOne({
        email: body.email.toLowerCase(),
      });
      if (existsEmail) {
        throw {
          status: HttpStatus.SERVICE_UNAVAILABLE,
          message: 'This email already exist',
        };
      }

      body.password = await this.bcryptHasher.hashPassword(body.password);
      body.email = body.email.toLowerCase();

      const register_data: IUser = {
        ...body,
      };

      const newUser = await this.userService.create({ ...register_data }); //.create(body);
      newUser._id = newUser._id.toString();
      const tokens: Tokens = this.generateTokens(newUser);

      return tokens;
    } catch (error) {
      await catchHandler({
        status: error.status ? error.status : 500,
        message: error.message ? error.message : error,
      });
    }
  }

  async login(body: LoginDTO): Promise<Tokens> {
    try {
      const user: IUser = await this.userService.findOne({
        email: body.email.toLowerCase().trim(),
      });

      if (!user) {
        throw {
          status: HttpStatus.SERVICE_UNAVAILABLE,
          message: 'Wrong email or password',
        };
      }
      if (!user.password) {
        user.password = '';
      }
      const compare = await this.bcryptHasher.comparePassword(
        body.password.trim(),
        user.password,
      );

      if (!compare) {
        throw {
          status: HttpStatus.SERVICE_UNAVAILABLE,
          message: 'Wrong email or password',
        };
      }

      if (user.is_banned) {
        throw {
          status: HttpStatus.SERVICE_UNAVAILABLE,
          message: 'User has been banned',
        };
      }
      const tokens = this.generateTokens(user);

      return tokens;
    } catch (error) {
      await catchHandler({
        status: error.status ? error.status : 500,
        message: error.message ? error.message : error,
      });
    }
  }

  private generateTokens(body: IUser): Tokens {
    body.id = body._id.toString();
    const jwtData = automapper(GetProfileDTO, body);
    const access_token = this.jwtService.sign({ jwtData });

    const tokens: Tokens = {
      access_token,
    };

    return tokens;
  }
}
