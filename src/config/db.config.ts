import { Supplier } from '../base/Supplier';

export class DBConfig extends Supplier {
  static local = {
    mongo:
      'mongodb+srv://remote_db_user:53f1Bh8k339ivIXz@sampleremote.i1jbrku.mongodb.net/remote_db',
    /* redis: {
      host: 'localhost',
      port: 6379,
    }, */
  };

  constructor() {
    super(DBConfig[DBConfig.getEnvValue()]);
  }
}
