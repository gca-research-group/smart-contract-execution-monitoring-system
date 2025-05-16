import { Response } from './response';

export interface CrudBase<Entity, Filter, CreateEntity, UpdateEntity> {
  findAll: (options: Filter) => Promise<Response<Entity[]>>;
  findOne: (id: number | string) => Promise<Entity>;
  create: (data: CreateEntity) => Promise<Entity>;
  update: (id: number | string, data: UpdateEntity) => Promise<Entity>;
}
