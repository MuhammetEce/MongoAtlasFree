import { Model } from 'mongoose';

export class BaseService<T> {
  constructor(public model: Model<T>) {}

  async create(entity: T): Promise<any> {
    return this.model.create(entity);
  }
  async findOne(filter: any = {}, select?: any): Promise<T> {
    return this.model.findOne(filter).select(select).lean();
  }
  async find(filter: any = {}, select?: string): Promise<T[]> {
    return this.model.find(filter).select(select).lean();
  }
  async findWithPopulate(
    filter: any,
    select?: string,
    populate_key?: string,
    populate_select?: string,
  ): Promise<T[]> {
    return this.model
      .find(filter)
      .select(select)
      .populate(populate_key, populate_select)
      .lean();
  }
  async findWithSort(
    filter: any = {},
    select?: string,
    sort?: any,
  ): Promise<T[]> {
    return this.model.find(filter).select(select).sort(sort).lean();
  }
  async findById(id: string, select?: any): Promise<T> {
    return this.model.findById(id).select(select).lean();
  }
  async delete(_id: string): Promise<InstanceType<any>> {
    return this.model.updateOne({ _id }, { is_deleted: true }).exec();
  }

  async updateById(_id: string, item: T): Promise<any> {
    return this.model.findByIdAndUpdate(_id, item).lean();
  }

  async updateOne(query: any, item: any): Promise<any> {
    return this.model.updateOne(query, item);
  }
}
