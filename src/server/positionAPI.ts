import express, { Request, Response } from 'express';
import { body, query } from 'express-validator';
import {
  getAllPositions,
  getPosition,
  createPosition,
  updatePosition,
  deletePosition,
} from '../controllers/PositionController';
import { responseHelper, validate } from './utils';

const positionAPI = express.Router();

const positionValidator = [
  body('positionName').exists().isString(),
];

positionAPI.get(
  '/',
  (_, res: Response) => {
    const buildData = async () => {
      const allPositions = await getAllPositions();
      return { positions: allPositions };
    };
    responseHelper(res, buildData);
  },
);

positionAPI.get(
  '/:id',
  validate([query('id').isString()]),
  (req: Request, res: Response) => {
    const { id } = req.params;
    const buildData = async () => {
      const position = await getPosition(id);
      return { position };
    };
    responseHelper(res, buildData);
  },
);

positionAPI.post(
  '/',
  validate(positionValidator),
  async (req: Request, res: Response) => {
    const { positionName } = req.body;
    responseHelper(res, () => createPosition(positionName), 'Position created successfully');
  },
);

positionAPI.patch(
  '/',
  validate([...positionValidator, body('id').exists().isString()]),
  async (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { id, positionName } = req.body;
    responseHelper(res, () => updatePosition(id, positionName), 'Position updated successfully');
  },
);

positionAPI.delete(
  '/',
  validate([body('id').exists().isString()]),
  async (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { id } = req.body;
    responseHelper(res, () => deletePosition(id), 'Position removed successfully');
  },
);

export default positionAPI;
