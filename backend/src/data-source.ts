import { DataSourceOptions, DataSource } from 'typeorm';
import { join } from 'path';

const isProduction = process.env.NODE_ENV === 'production';
const databaseUrl = process.env.DATABASE_URL;

const common: Partial<DataSourceOptions> = {
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  synchronize: false,
};

let options: DataSourceOptions;

if (databaseUrl) {
  options = {
    type: 'postgres',
    url: databaseUrl,
    ...common,
    ssl: isProduction ? { rejectUnauthorized: false } : undefined,
  } as DataSourceOptions;
} else {
  options = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'stagelink',
    ...common,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
  } as DataSourceOptions;
}

export const AppDataSource = new DataSource(options);
export default AppDataSource;
