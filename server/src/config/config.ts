import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const {
  POSTGRES_USER,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  DATABASE_PORT,
  DATABASE_HOST,
} = process.env;

interface Config {
  database: PostgresConnectionOptions;
}

export const config = {
  database: {
    type: 'postgres',
    host: DATABASE_HOST ?? 'localhost',
    port: parseInt(DATABASE_PORT, 10) || 5432,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    entities: [''],
    migrations: [''],
  },
} as Config;
