// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-unused-vars
import { faker } from '@faker-js/faker';
import { ObjectLiteral, Repository } from 'typeorm';
import Employee from './model/Employee';
// @imports
import {
  AppDataSource,
  employeeRepository,
} from './AppDataSource';

const getRandomNumberRange = (min: number, max: number) => {
  if (min > max) {
    throw new Error('min cannot be greater than max');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getRandomElement = <Type>(collection: Type[]) => collection[Math
  .floor(Math.random() * collection.length)];

const fakeMany = <Type extends ObjectLiteral>(
  fake: () => Type,
  instances: number,
) => {
  const collection: Type[] = [];
  for (let i = 0; i < instances; i += 1) {
    collection.push(fake());
  }
  return collection;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fakeInsertMany = async <Type extends ObjectLiteral>(
  fake: () => Type,
  instances: number,
  repository: Repository<Type>,
) => {
  const collection: Type[] = [];
  for (let i = 0; i < instances; i += 1) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const newEntry = await repository.save(fake());
      collection.push(newEntry);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
  return collection;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fakeRandomMany = <Type extends ObjectLiteral>(
  fake: () => Type,
  minInstances: number,
  maxInstances: number,
) => {
  const instances = getRandomNumberRange(minInstances, maxInstances);
  return fakeMany(fake, instances);
};

const fakeEmployees = () => {
  const name = faker.name.firstName();
  return new Employee(name);
};

// @fakers

// eslint-disable-next-line arrow-body-style
const fakeDatabase = async () => {
  await fakeInsertMany(fakeEmployees, 30, employeeRepository);
  return true;
};

const initDatabase = () => {
  AppDataSource.initialize()
    .then(() => {
      // eslint-disable-next-line
      console.log('initialized database');
      return fakeDatabase();
    }).then(() => {
      // eslint-disable-next-line
      console.log('database filled');
      process.exit(0);
    })
    .catch((error: string) => {
      // eslint-disable-next-line
      console.log(error);
    });
};

initDatabase();
