import Skill from '../model/Skill';
import { skillRepository } from '../AppDataSource';

export const getAllSkills = () => skillRepository.find();

export const getSkill = async (id: string) => {
  const skill = await skillRepository.findOneBy({ id });
  if (!skill) {
    throw new Error(`Skill with id ${id} not found`);
  }
  return skill;
};

export const createSkill = (name: string) => {
  const newSkill = new Skill(name);
  return skillRepository.insert(newSkill);
};

export const updateSkill = async (id: string, name: string) => {
  const skill = await getSkill(id);
  skill.setName(name);
  return skillRepository.save(skill);
};

export const deleteSkill = async (id: string) => {
  const skillToRemove = await getSkill(id);
  return skillRepository.remove(skillToRemove);
};
