import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import { registerAs } from '@nestjs/config';

export const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  synchronize: false,
};

export const typeorm = registerAs('typeorm', () => config);
export const connection = new DataSource(config);
