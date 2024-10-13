import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import EmployeeSkill from './model/EmployeeSkill';
import Employee from './model/Employee';
import Position from './model/Position';
import Avatar from './model/Avatar';
import Skill from './model/Skill';
// @imports

dotenv.config();

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  FAKE_DATABASE,
} = process.env;

// eslint-disable-next-line import/prefer-default-export
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: DB_HOST,
  port: Number(DB_PORT) === -1 ? undefined : Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [
    Skill,
    Position,
    Avatar,
    Position,
    Employee,
    EmployeeSkill,
  ],
  synchronize: true,
  logging: false,
  dropSchema: FAKE_DATABASE === 'true',
});

export const employeeRepository = AppDataSource.getRepository(Employee);

export const positionRepository = AppDataSource.getRepository(Position);

export const avatarRepository = AppDataSource.getRepository(Avatar);

export const skillRepository = AppDataSource.getRepository(Skill);

export const employeeSkillRepository = AppDataSource.getRepository(EmployeeSkill);
