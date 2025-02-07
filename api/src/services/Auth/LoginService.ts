import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import { AppError } from '@app/errors';

import { ShowUserByEmailService } from '../User';

export const LoginService = async (email: string, password: string) => {
  const SECRET_KEY = process.env.SECRET_KEY;

  if (!SECRET_KEY) {
    throw new AppError('ERROR_INVALID_SECRET_KEY', 401);
  }

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('ERROR_INVALID_EMAIL')
      .required('ERROR_EMAIL_IS_REQUIRED'),
    password: Yup.string().required('ERROR_PASSWORD_IS_REQUIRED'),
  });

  try {
    await schema.validate({ email, password });
  } catch (error) {
    throw new AppError((error as { message: string }).message, 401);
  }

  const user = await ShowUserByEmailService(email);

  if (!user) {
    throw new AppError('ERROR_INVALID_EMAIL', 401);
  }

  const result = await bcrypt.compare(password, user.password);

  if (!result) {
    throw new AppError('ERROR_INVALID_PASSWORD', 401);
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '7d' });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    isSuper: user.isSuper,
    token,
    refreshToken
  };
};
