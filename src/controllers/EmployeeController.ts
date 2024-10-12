import { employeeRepository } from '../AppDataSource';

export const getRawEmployees = () => employeeRepository.find(
  { relations: { position: true, avatar: true, employeeSkills: { skill: true } } },
);

export const getAllEmployees = () => employeeRepository.find({
  relations: { position: true, avatar: true, employeeSkills: { skill: true } },
})
  .then((employees) => employees.map((employee) => ({
    name: employee.name,
    position: employee.position?.title,
    avatar: employee.avatar?.fileName,
    skills: employee.employeeSkills.map((skill) => ({
      skill: skill.skill.name,
      expertise: skill.expertise,
    })),
  })));

export const getEmployee = async (id: string) => {
  const employee = await employeeRepository.findOneBy({ id });
  if (!employee) {
    throw new Error(`Employee with id ${id} not found`);
  }
  return employee;
};

export const deleteEmployee = async (id: string) => {
  const employeeToRemove = await getEmployee(id);
  return employeeRepository.remove(employeeToRemove);
};
