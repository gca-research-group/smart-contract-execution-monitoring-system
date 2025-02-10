import { AppError } from '@app/errors';
import jwt from 'jsonwebtoken';

const EXPIRES_IN = 60 * 1 // '1h'

export const RefreshTokenService = (refreshToken: string) => {
  const SECRET_KEY = process.env.SECRET_KEY;

  if (!SECRET_KEY) {
    throw new AppError('ERROR_INVALID_SECRET_KEY', 401);
  }

  try {
    const verifiedToken = jwt.verify(refreshToken, SECRET_KEY) as unknown as {
      id: number;
    };

    const token = jwt.sign({ id: verifiedToken.id }, SECRET_KEY, {
      expiresIn: EXPIRES_IN,
    });

    return token;
  } catch {
    throw new AppError('ERR_SESSION_EXPIRED', 401);
  }
};
