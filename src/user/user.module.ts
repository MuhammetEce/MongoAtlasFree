import { Module, MiddlewareConsumer } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { VerifyMiddleware } from '../base/middlewares/verify.middleware';
import { BcryptHasher } from '../base/hash.password.bcryptjs';
import { AuthModule } from '../authentication/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../models/user.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, BcryptHasher],
  exports: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyMiddleware).forRoutes(UserController);
  }
}
