import {
  DeepPartial,
  FindOptionsOrder,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';

import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ListBaseDto } from '@app/dtos';
import { Response } from '@app/models';

type Entity<T> = new (...args: any[]) => T;

export function CrudBaseService<
  E extends ObjectLiteral,
  L extends ListBaseDto,
  R,
  S,
>(entity: Entity<E>) {
  class BaseCrudServiceHost {
    constructor(
      @InjectRepository(entity)
      readonly _repository: Repository<E>,
    ) {}

    buildWhereOptions(_options: L): FindOptionsWhere<Entity<E>> {
      return {};
    }

    async findAll(options: L): Promise<Response<E[]>> {
      const pageSize = +(options.pageSize ?? 20);

      const offset = (+options.page - 1) * pageSize;

      const orderBy = options.orderBy ?? 'id';
      const orderDirection = options.orderDirection ?? 'desc';

      const whereOptions = this.buildWhereOptions(options);

      const total = await this._repository.count();

      const data = await this._repository.find({
        where: whereOptions,
        skip: offset,
        take: pageSize,
        order: {
          [orderBy]: orderDirection,
        } as FindOptionsOrder<E>,
      });

      const hasMore = total > offset + pageSize;

      return {
        total,
        data,
        hasMore,
        page: +options.page,
        pages: Math.ceil(total / pageSize),
      };
    }

    async findOne(id: number): Promise<E> {
      const item = await this._repository.findOneBy({
        id,
      } as unknown as FindOptionsWhere<E>);

      if (!item) {
        throw new BadRequestException('ITEM_NOT_FOUND');
      }

      return item;
    }

    async remove(id: number): Promise<void> {
      await this._repository.delete(id);
    }

    async create(data: R): Promise<E> {
      const item = await this._repository.save({
        ...data,
      } as DeepPartial<E>);

      return item;
    }

    async update(id: number, data: S): Promise<E> {
      const entity = await this.findOne(id);

      const item = await this._repository.save({
        ...entity,
        ...data,
      });

      return item;
    }
  }

  return BaseCrudServiceHost;
}
