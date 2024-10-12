import { ObjectLiteral, Repository } from 'typeorm';

const getRandomNumberRange = (min: number, max: number) => {
  if (min > max) {
    throw new Error('min cannot be greater than max');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomElement = <Type>(collection: Type[]) => collection[Math
  .floor(Math.random() * collection.length)];

const getSubset = <Type>(collection: Type[], length: number) => {
  const subSet = new Set<Type>();
  while (subSet.size < length) {
    const value = getRandomElement(collection);
    subSet.add(value);
  }
  return Array.from(subSet);
};

export const getRandomSubset = <Type>(collection: Type[], minLenght: number, maxLenght: number) => {
  const length = getRandomNumberRange(minLenght, maxLenght);
  return getSubset(collection, length);
};

export const fakeInsertMany = async <Type extends ObjectLiteral>(
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

export const fakeInsertRandomMany = async <Type extends ObjectLiteral>(
  fake: () => Type,
  minInstances: number,
  maxInstances: number,
  repository: Repository<Type>,
) => {
  const instances = getRandomNumberRange(minInstances, maxInstances);
  return fakeInsertMany(fake, instances, repository);
};
