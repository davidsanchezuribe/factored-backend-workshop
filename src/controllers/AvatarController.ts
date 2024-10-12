import Avatar from '../model/Avatar';
import { avatarRepository } from '../AppDataSource';

export const getAllAvatars = () => avatarRepository.find();

export const getAvatar = async (id: string) => {
  const avatar = await avatarRepository.findOneBy({ id });
  if (!avatar) {
    throw new Error(`Avatar with id ${id} not found`);
  }
  return avatar;
};

export const createAvatar = (fileName: string) => {
  const newAvatar = new Avatar(fileName);
  return avatarRepository.insert(newAvatar);
};

export const updateAvatar = async (id: string, fileName: string) => {
  const avatar = await getAvatar(id);
  avatar.setFileName(fileName);
  return avatarRepository.save(avatar);
};

export const deleteAvatar = async (id: string) => {
  const avatarToRemove = await getAvatar(id);
  return avatarRepository.remove(avatarToRemove);
};
