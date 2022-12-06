import { ApiException } from '../helpers/APICallMapper';
import { automapper } from '../helpers/Mapper';
import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, NextFunction } from 'express';
import { GetProfileDTO } from '../../user/dto/user.dto';

@Injectable()
export class VerifyMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: any, res: Response, next: NextFunction) {
    const { authorization, lang } = req.headers;

    if (!authorization) {
      throw new HttpException(
        new ApiException(401, 'Authorization Error'),
        401,
      );
    }

    try {
      const bearer = authorization.replace('Bearer', '').trim();
      const decoded = this.jwtService.verify(bearer);
      // decoded.jwtData.id = decoded._id;
      if (!decoded || decoded.jwtData.is_banned) {
        throw new HttpException(
          new ApiException(401, 'Authorization Error'),
          401,
        );
      }
      req.user = automapper(GetProfileDTO, decoded.jwtData);
      req.lang = lang;
    } catch (err) {
      if (err.expiredAt && err.expiredAt < new Date()) {
        throw new HttpException(
          new ApiException(401, 'Authorization Error'),
          401,
        );
      } else {
        throw new HttpException(
          new ApiException(401, 'Authorization Error'),
          401,
        );
      }
    }

    next();
  }
}
