import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Supplier extends ConfigService {
  protected static env = 'NODE_ENV';

  constructor(conf: any, envName?: string) {
    super(conf);

    if (envName) Supplier.env = envName;
  }

  static getEnvValue() {
    return process.env[Supplier.env];
  }
}
