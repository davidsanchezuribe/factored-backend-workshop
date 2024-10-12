import Position from '../model/Position';
import { positionRepository } from '../AppDataSource';

export const getAllPositions = () => positionRepository.find();

export const getPosition = async (id: string) => {
  const position = await positionRepository.findOneBy({ id });
  if (!position) {
    throw new Error(`Position with id ${id} not found`);
  }
  return position;
};

export const createPosition = (title: string) => {
  const newPosition = new Position(title);
  return positionRepository.insert(newPosition);
};

export const updatePosition = async (id: string, title: string) => {
  const position = await getPosition(id);
  position.setTitle(title);
  return positionRepository.save(position);
};

export const deletePosition = async (id: string) => {
  const positionToRemove = await getPosition(id);
  return positionRepository.remove(positionToRemove);
};
