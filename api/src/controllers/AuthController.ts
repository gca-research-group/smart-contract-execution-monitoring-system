import { Request, Response } from 'express';

import { LoginService, RefreshTokenService } from '@app/services/Auth';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { id, name, isSuper, token, refreshToken } = await LoginService(
    email,
    password,
  );

  res.cookie('refreshToken', refreshToken, {
    secure: false,
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
  });

  res.json({ id, name, email, isSuper, token });
};


export const refresh = async (req: Request, res: Response) => {
  const refreshToken: string = req.cookies?.refreshToken;

  const token = RefreshTokenService(refreshToken);

  res.json({ token });
}