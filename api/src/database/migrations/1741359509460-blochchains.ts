import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Blochchains1741359509460 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'blockchains',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__blockchains__id',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'platform',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'parameters',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'boolean',
            isNullable: false,
            default: true,
          },
          {
            name: 'remarks',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'createdById',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedById',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'blockchains',
      new TableForeignKey({
        name: 'fk__blockchains__created_by_id__blockchains__id',
        columnNames: ['createdById'],
        referencedTableName: 'blockchains',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'blockchains',
      new TableForeignKey({
        name: 'fk__blockchains__updated_by_id__blockchains__id',
        columnNames: ['updatedById'],
        referencedTableName: 'blockchains',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('blockchains');
  }
}
