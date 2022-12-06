import { Supplier } from '../base/Supplier';

export class AppConfig extends Supplier {
  static local = {
    host: 'localhost',
    port: 3032,
    crypt: {
      rounds: 10,
      secret: 'ppog19aqnk',
    },
    domain: 'http://localhost:3032',
  };

  constructor() {
    super(AppConfig[AppConfig.getEnvValue()]);
  }
}
