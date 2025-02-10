import { NextFunction, Request, Response } from 'express';
import { AppError } from '@app/errors';
import jwt from 'jsonwebtoken';

export const isAuthenticatedMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    throw new AppError('TOKEN_IS_REQUIRED', 401);
  }

  const SECRET_KEY = process.env.SECRET_KEY;

  if (!SECRET_KEY) {
    throw new AppError('INVALID_SECRET_KEY', 401);
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as unknown as { id: number };
    req.user = decoded;
    next();
  } catch {
    throw new AppError('TOKEN_IS_INVALID_OR_EXPIRED', 403);
  }
};
