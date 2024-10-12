// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-unused-vars
import { faker } from '@faker-js/faker';
import { ObjectLiteral, Repository } from 'typeorm';
import fileNames from './fileNames';
import Employee from './model/Employee';
import Position from './model/Position';
import Avatar from './model/Avatar';
// @imports
import {
  employeeRepository,
  positionRepository,
  avatarRepository,
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

const fakeEmployees = (positions: Position[], avatars: Avatar[]) => () => {
  const name = faker.person.firstName();
  const position = getRandomElement(positions);
  const avatar = getRandomElement(avatars);
  return new Employee(name, position, avatar);
};

const fakePositions = () => {
  const positionName = faker.person.jobTitle();
  return new Position(positionName);
};

const fakeAvatars = (buildFileName: () => string) => () => {
  const fileName = buildFileName();
  return new Avatar(fileName);
};

// @fakers

// eslint-disable-next-line arrow-body-style
const fakeDatabase = async () => {
  const positions = await fakeInsertMany(fakePositions, 3, positionRepository);
  const buildFileName = () => getRandomElement(fileNames);
  const avatars = await fakeInsertMany(fakeAvatars(buildFileName), 3, avatarRepository);
  await fakeInsertMany(fakeEmployees(positions, avatars), 5, employeeRepository);
  console.log('database filled');
};

export default fakeDatabase;
