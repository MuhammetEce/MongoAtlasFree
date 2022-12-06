import { DynamicConfigModule } from './base/helpers/DynamicConfigModule';
import { DynamicSupplierConfigFactory } from './base/helpers/DynamicSupplierConfigFactory';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfig } from './config/app.config';
import { DBConfig } from './config/db.config';
import { BcryptHasher } from './base/hash.password.bcryptjs';

import { AuthModule } from './authentication/auth.module';
import { UserModule } from './user/user.module';

DynamicSupplierConfigFactory.registerSupplier('db', new DBConfig());
DynamicSupplierConfigFactory.registerSupplier('app', new AppConfig());
const mongo = DynamicSupplierConfigFactory.get('db').get('mongo');

@Module({
  imports: [
    MongooseModule.forRoot(mongo),
    DynamicConfigModule.register(),
    AuthModule,
    UserModule,
  ],
  providers: [BcryptHasher],
})
export class AppModule {}
