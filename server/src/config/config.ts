import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const {
  POSTGRES_USER,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  DATABASE_PORT,
  DATABASE_HOST,
  APP_PORT,
  WEATHER_API_KEY,
  WEATHER_API_URL,
} = process.env;

interface Config {
  database: PostgresConnectionOptions;
  common: {
    appPort: number;
  };
  weatherApi: {
    apiKey: string;
    baseUrl: string;
  };
}

export const config = {
  database: {
    type: 'postgres',
    host: DATABASE_HOST ?? 'localhost',
    port: parseInt(DATABASE_PORT, 10) || 5432,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    entities: ['./dist/database/entities/*.js'],
    migrations: ['./dist/database/migrations/*.js'],
  },
  common: {
    appPort: APP_PORT ?? 5000,
  },
  weatherApi: {
    apiKey: WEATHER_API_KEY,
    baseUrl: WEATHER_API_URL,
  },
} as Config;
