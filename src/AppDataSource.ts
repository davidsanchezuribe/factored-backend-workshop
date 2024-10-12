import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import Employee from './model/Employee';
import Position from './model/Position';
import Avatar from './model/Avatar';
// @imports

dotenv.config();

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  FAKE_DATABASE,
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
    Avatar,
    Position,
    Employee,
  ],
  synchronize: true,
  logging: false,
  dropSchema: FAKE_DATABASE === 'true',
});

export const employeeRepository = AppDataSource.getRepository(Employee);

export const positionRepository = AppDataSource.getRepository(Position);

export const avatarRepository = AppDataSource.getRepository(Avatar);
