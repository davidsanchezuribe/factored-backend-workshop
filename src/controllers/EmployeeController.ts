import Position from 'model/Position';
import Avatar from 'model/Avatar';
import Employee from '../model/Employee';
import { employeeRepository } from '../AppDataSource';

export const getAllEmployees = () => employeeRepository.find(
  { relations: { position: true, avatar: true } },
).then((employees) => employees.map((employee) => ({
  name: employee.name,
  position: employee.position.positionName,
  avatar: employee.avatar.fileName,
})));

export const getEmployee = async (id: string) => {
  const employee = await employeeRepository.findOneBy({ id });
  if (!employee) {
    throw new Error(`Employee with id ${id} not found`);
  }
  return employee;
};

export const createEmployee = (name: string, position: Position, avatar: Avatar) => {
  const newEmployee = new Employee(name, position, avatar);
  return employeeRepository.insert(newEmployee);
};

export const updateEmployee = async (id: string, name: string, position: Position) => {
  const employee = await getEmployee(id);
  employee.setName(name);
  employee.setPosition(position);
  return employeeRepository.save(employee);
};

export const deleteEmployee = async (id: string) => {
  const employeeToRemove = await getEmployee(id);
  return employeeRepository.remove(employeeToRemove);
};
