import express, { Request, Response } from 'express';
import { body, query } from 'express-validator';
import {
  getAllAvatars,
  getAvatar,
  createAvatar,
  updateAvatar,
  deleteAvatar,
} from '../controllers/AvatarController';
import { responseHelper, validate } from './utils';

const avatarAPI = express.Router();

const avatarValidator = [
  body('fileName').exists().isString(),
];

avatarAPI.get(
  '/',
  (_, res: Response) => {
    const buildData = async () => {
      const allAvatars = await getAllAvatars();
      return { avatars: allAvatars };
    };
    responseHelper(res, buildData);
  },
);

avatarAPI.get(
  '/:id',
  validate([query('id').isString()]),
  (req: Request, res: Response) => {
    const { id } = req.params;
    const buildData = async () => {
      const avatar = await getAvatar(id);
      return { avatar };
    };
    responseHelper(res, buildData);
  },
);

avatarAPI.post(
  '/',
  validate(avatarValidator),
  async (req: Request, res: Response) => {
    const { fileName } = req.body;
    responseHelper(res, () => createAvatar(fileName), 'Avatar created successfully');
  },
);

avatarAPI.patch(
  '/',
  validate([...avatarValidator, body('id').exists().isString()]),
  async (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { id, fileName } = req.body;
    responseHelper(res, () => updateAvatar(id, fileName), 'Avatar updated successfully');
  },
);

avatarAPI.delete(
  '/',
  validate([body('id').exists().isString()]),
  async (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { id } = req.body;
    responseHelper(res, () => deleteAvatar(id), 'Avatar removed successfully');
  },
);

export default avatarAPI;
