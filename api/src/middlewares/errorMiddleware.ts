/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';

import { AppError } from '@app/errors';
import { logger } from '@app/utils';

export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _nf: NextFunction,
): any => {
  logger.error(error);
  if (error instanceof AppError) {
    if (error.status === 401) {
      res.clearCookie('refreshToken');
    }

    return res.status(error.status || 400).json({ message: error.message });
  }

  return res.status(500).json({ message: error.message });
};
