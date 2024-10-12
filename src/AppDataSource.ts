import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import Employee from './model/Employee';
// @imports

dotenv.config();

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

// eslint-disable-next-line import/prefer-default-export
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: DATABASE_HOST,
  port: Number(DATABASE_PORT) === -1 ? undefined : Number(DATABASE_PORT),
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  entities: [
    Employee,
  ],
  synchronize: true,
  logging: false,
});
export const employeeRepository = AppDataSource.getRepository(Employee);
