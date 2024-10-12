import express, { Request, Response } from 'express';
import { body, param } from 'express-validator';
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
  body('title').exists().isString(),
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
  [param('id').isUUID()],
  validate,
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
  positionValidator,
  validate,
  async (req: Request, res: Response) => {
    const { title } = req.body;
    responseHelper(res, () => createPosition(title), 'Position created successfully');
  },
);

positionAPI.patch(
  '/',
  [...positionValidator, body('id').exists().isUUID()],
  validate,
  async (req: Request, res: Response) => {
    const { id, title } = req.body;
    responseHelper(res, () => updatePosition(id, title), 'Position updated successfully');
  },
);

positionAPI.delete(
  '/',
  [body('id').exists().isUUID()],
  validate,
  async (req: Request, res: Response) => {
    const { id } = req.body;
    responseHelper(res, () => deletePosition(id), 'Position removed successfully');
  },
);

export default positionAPI;
