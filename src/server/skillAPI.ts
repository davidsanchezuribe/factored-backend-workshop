import express, { Request, Response } from 'express';
import { body, param } from 'express-validator';
import {
  getAllSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
} from '../controllers/SkillController';
import { responseHelper, validate } from './utils';

const skillAPI = express.Router();

const skillValidator = [
  body('name').exists().isString(),
];

skillAPI.get(
  '/',
  (_, res: Response) => {
    const buildData = async () => {
      const allSkills = await getAllSkills();
      return { skills: allSkills };
    };
    responseHelper(res, buildData);
  },
);

skillAPI.get(
  '/:id',
  [param('id').isUUID()],
  validate,
  (req: Request, res: Response) => {
    const { id } = req.params;
    const buildData = async () => {
      const skill = await getSkill(id);
      return { skill };
    };
    responseHelper(res, buildData);
  },
);

skillAPI.post(
  '/',
  skillValidator,
  validate,
  async (req: Request, res: Response) => {
    const { name } = req.body;
    responseHelper(res, () => createSkill(name), 'Skill created successfully');
  },
);

skillAPI.patch(
  '/',
  [...skillValidator, body('id').exists().isUUID()],
  validate,
  async (req: Request, res: Response) => {
    const { id, name } = req.body;
    responseHelper(res, () => updateSkill(id, name), 'Skill updated successfully');
  },
);

skillAPI.delete(
  '/',
  [body('id').exists().isUUID()],
  validate,
  async (req: Request, res: Response) => {
    const { id } = req.body;
    responseHelper(res, () => deleteSkill(id), 'Skill removed successfully');
  },
);

export default skillAPI;
