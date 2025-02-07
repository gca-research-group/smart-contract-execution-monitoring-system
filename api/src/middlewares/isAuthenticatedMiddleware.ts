import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { AppError } from '@app/errors';
import { ShowUserByApiKeyService } from '@app/services/User';

export const isAuthenticatedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const apiKey = req.header('apiKey');

  if (apiKey) {
    const user = await ShowUserByApiKeyService(apiKey);

    if (!user) {
      throw new AppError('ERROR_INVALID_API_KEY', 401);
    }

    req.user = { id: user.id };

    next();

    return;
  }

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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new AppError('TOKEN_IS_INVALID_OR_EXPIRED', 403);
  }
};
