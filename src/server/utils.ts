import { Request, Response, NextFunction } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const responseHelper = async (
  res: Response,
  buildData: () => Promise<any>,
  successMessage?: string,
) => {
  try {
    const data = await buildData();
    res.status(200).json(successMessage ? { msg: successMessage } : data);
  } catch (error) {
    res.status(400).json({ msg: getErrorMessage(error) });
  }
};

export const validate = (validations: ValidationChain[]) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await Promise.all(validations.map((validation) => validation.run(req)));
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  }
  res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
};
