import express, { Request, Response } from 'express';
import { body, param } from 'express-validator';
import {
  getAllEmployees,
  getEmployee,
  deleteEmployee,
  getRawEmployees,
} from '../controllers/EmployeeController';
import { responseHelper, validate } from './utils';

const employeeAPI = express.Router();

employeeAPI.get(
  '/',
  (_, res: Response) => {
    const buildData = async () => {
      const allEmployees = await getAllEmployees();
      console.log(allEmployees);
      return { employees: allEmployees };
    };
    responseHelper(res, buildData);
  },
);

employeeAPI.get(
  '/rawData',
  (_, res: Response) => {
    const buildData = async () => {
      const allEmployees = await getRawEmployees();
      return { employees: allEmployees };
    };
    responseHelper(res, buildData);
  },
);

employeeAPI.get(
  '/:id',
  [param('id').isUUID()],
  validate,
  (req: Request, res: Response) => {
    const { id } = req.params;
    const buildData = async () => {
      const employee = await getEmployee(id);
      return { employee };
    };
    responseHelper(res, buildData);
  },
);

employeeAPI.delete(
  '/',
  [body('id').exists().isUUID()],
  validate,
  async (req: Request, res: Response) => {
    const { id } = req.body;
    responseHelper(res, () => deleteEmployee(id), 'Employee removed successfully');
  },
);

export default employeeAPI;
