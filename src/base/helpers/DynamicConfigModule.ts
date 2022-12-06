import { DynamicModule, Global, Module } from '@nestjs/common';
import { DynamicSupplierConfigFactory } from './DynamicSupplierConfigFactory';

@Global()
@Module({})
export class DynamicConfigModule {
  static register(): DynamicModule {
    const providers = [];
    const exports = [];

    for (const [
      key,
      value,
    ] of DynamicSupplierConfigFactory.getAllSuppliersMap()) {
      providers.push({
        provide: `CONFIG_${key.toUpperCase()}`,
        useValue: value,
      });

      exports.push(`CONFIG_${key.toUpperCase()}`);
    }

    return {
      providers,
      exports,
      module: DynamicConfigModule,
    };
  }
}
