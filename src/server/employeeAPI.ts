import express, { Request, Response } from 'express';
import { body, query } from 'express-validator';
import {
  getAllEmployees,
  getEmployee,
  // createEmployee,
  // updateEmployee,
  deleteEmployee,
} from '../controllers/EmployeeController';
import { responseHelper, validate } from './utils';

const employeeAPI = express.Router();

// const employeeValidator = [
//   body('name').exists().isString(),
// ];

employeeAPI.get(
  '/',
  (_, res: Response) => {
    const buildData = async () => {
      const allEmployees = await getAllEmployees();
      return { employees: allEmployees };
    };
    return responseHelper(res, buildData);
  },
);

employeeAPI.get(
  '/:id',
  validate([query('id').isString()]),
  (req: Request, res: Response) => {
    const { id } = req.params;
    const buildData = async () => {
      const employee = await getEmployee(id);
      return { employee };
    };
    return responseHelper(res, buildData);
  },
);

// employeeAPI.post(
//   '/',
//   validate(employeeValidator),
//   async (req: Request, res: Response) => {
//     const { name } = req.body;
//     return responseHelper(res, () => createEmployee(name), 'Employee created successfully');
//   },
// );

// employeeAPI.patch(
//   '/',
//   validate([...employeeValidator, body('id').exists().isString()]),
//   async (req: Request, res: Response) => {
//     // eslint-disable-next-line @typescript-eslint/naming-convention
//     const { id, name } = req.body;
//     return responseHelper(res, () => updateEmployee(id, name), 'Employee updated successfully');
//   },
// );

employeeAPI.delete(
  '/',
  validate([body('id').exists().isString()]),
  async (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { id } = req.body;
    return responseHelper(res, () => deleteEmployee(id), 'Employee removed successfully');
  },
);

export default employeeAPI;
