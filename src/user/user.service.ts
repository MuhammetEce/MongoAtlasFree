import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from '../base/Service.base';
import { IUser } from './interfaces/User';
import { catchHandler } from '../base/helpers/exception';
import { UpdatePasswordDTO } from './dto/user.dto';
import { BcryptHasher } from '../base/hash.password.bcryptjs';

@Injectable()
export class UserService extends BaseService<IUser> {
  constructor(
    private bcryptHasher: BcryptHasher,
    @InjectModel('User') public model: Model<IUser>,
  ) {
    super(model);
  }
  async changePassword(
    body: UpdatePasswordDTO,
    _user: IUser,
  ): Promise<boolean> {
    try {
      if (Object.keys(body).length < 2) {
        throw {
          status: HttpStatus.SERVICE_UNAVAILABLE,
          message: 'Please check your old password',
        };
      }
      const pass = await this.model.findOne({ _id: _user.id }, 'password');
      const compare = await this.bcryptHasher.comparePassword(
        body.oldPassword,
        pass.password,
      );

      if (!compare) {
        throw {
          status: HttpStatus.SERVICE_UNAVAILABLE,
          message: 'Please check your old password',
        };
      }
      if (body.newPassword !== body.newPasswordConfirm) {
        throw {
          status: HttpStatus.SERVICE_UNAVAILABLE,
          message: 'Password and confirm not maches',
        };
      }
      body.newPassword = await this.bcryptHasher.hashPassword(body.newPassword);
      await this.updateById(_user.id, {
        password: body.newPassword,
      });
      return true;
    } catch (error) {
      await catchHandler({
        status: error.status ? error.status : 500,
        message: error.message ? error.message : error,
      });
    }
  }
}
