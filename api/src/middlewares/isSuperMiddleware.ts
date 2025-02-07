import { NextFunction, Request, Response } from 'express';

import { AppError } from '@app/errors';
import { ShowUserService } from '@app/services/User';

export const isSuperMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { id } = req.user;

  const user = await ShowUserService(id);

  if (!user || !user?.isSuper) {
    throw new AppError('ERROR_USER_IS_NOT_A_SUPER_USER');
  }

  next();
};
