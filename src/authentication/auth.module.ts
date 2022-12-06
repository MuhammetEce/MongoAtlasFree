import { Module } from '@nestjs/common';
import { BcryptHasher } from '../base/hash.password.bcryptjs';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../base/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../models/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  providers: [AuthService, BcryptHasher, UserService],
  exports: [BcryptHasher, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
