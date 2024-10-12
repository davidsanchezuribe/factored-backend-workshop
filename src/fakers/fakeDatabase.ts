import { faker } from '@faker-js/faker';
import EmployeeSkill from '../model/EmployeeSkill';
import skillNames from './skillNames';
import fileNames from './fileNames';
import Employee from '../model/Employee';
import Position from '../model/Position';
import Avatar from '../model/Avatar';
import Skill from '../model/Skill';
// @imports
import {
  employeeRepository,
  positionRepository,
  avatarRepository,
  skillRepository,
  employeeSkillRepository,
} from '../AppDataSource';
import { fakeInsertMany, getRandomElement, getRandomSubset } from './fakers';

const fakePositions = () => {
  const title = faker.person.jobTitle();
  return new Position(title);
};

const fakeAvatars = () => {
  const fileName = getRandomElement(fileNames);
  return new Avatar(fileName);
};

const fakeEmployees = (positions: Position[], avatars: Avatar[]) => () => {
  const name = faker.person.firstName();
  const position = getRandomElement(positions);
  const avatar = getRandomElement(avatars);
  return new Employee(name, position, avatar);
};

const fakeSkills = () => {
  const skillName = getRandomElement(skillNames);
  return new Skill(skillName);
};

const fakeEmployeeSkills = (employees: Employee[], skills: Skill[]) => {
  const employeeSkills = employees.reduce<EmployeeSkill[]>((acum, employee) => {
    const skillSubset = getRandomSubset(skills, 3, 10);
    const newEmployeeSkills = skillSubset
      .map((skill) => new EmployeeSkill(employee, skill, faker.number.int({ min: 1, max: 5 })));
    return acum.concat(newEmployeeSkills);
  }, []);
  return employeeSkills;
};

// @fakers

const fakeDatabase = async () => {
  const positions = await fakeInsertMany(fakePositions, 3, positionRepository);
  const avatars = await fakeInsertMany(fakeAvatars, 3, avatarRepository);
  const employees = await fakeInsertMany(fakeEmployees(positions, avatars), 5, employeeRepository);
  const skills = await fakeInsertMany(fakeSkills, 30, skillRepository);
  await employeeSkillRepository.save(fakeEmployeeSkills(employees, skills));
  console.log('filled database');
};

export default fakeDatabase;
