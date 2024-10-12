import Employee from '../model/Employee';
import { employeeRepository } from '../AppDataSource';

export const getAllEmployees = () => employeeRepository.find();

export const getEmployee = async (id: string) => {
  const employee = await employeeRepository.findOneBy({ id });
  if (!employee) {
    throw new Error(`Employee with id ${id} not found`);
  }
  return employee;
};

export const createEmployee = (name: string) => {
  const newEmployee = new Employee(name);
  return employeeRepository.insert(newEmployee);
};

export const updateEmployee = async (id: string, name: string) => {
  const employee = await getEmployee(id);
  employee.setName(name);
  return employeeRepository.save(employee);
};

export const deleteEmployee = async (id: string) => {
  const employeeToRemove = await getEmployee(id);
  return employeeRepository.remove(employeeToRemove);
};
