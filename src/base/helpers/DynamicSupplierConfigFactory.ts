import { Supplier } from '../Supplier';

export class DynamicSupplierConfigFactory {
  public static registeredSuppliers: Map<string, Supplier> = new Map();

  public static registerSupplier(key: string, supplier: Supplier): Supplier {
    this.registeredSuppliers.set(key, supplier);
    return supplier;
  }

  public static getAllSuppliersMap() {
    return this.registeredSuppliers;
  }

  public static getAllSuppliers() {
    return this.registeredSuppliers.values();
  }

  public static get(supplier: string) {
    return this.registeredSuppliers.get(supplier);
  }
}
