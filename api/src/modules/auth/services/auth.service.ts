import * as bcrypt from 'bcrypt';
import { Response } from 'express';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';

import { LoginDto } from '@app/dtos';
import { UserService } from '@app/modules/user/services';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async getTokenPayload(token?: string) {
    if (!token) {
      throw new UnauthorizedException('TOKEN_IS_REQUIRED');
    }

    try {
      return await this.jwtService.verifyAsync<{ sub: number }>(token, {
        secret: process.env.SECRET_KEY,
      });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('TOKEN_EXPIRED');
      }

      throw new UnauthorizedException('INVALID_TOKEN');
    }
  }

  removeTokenPrefix(token?: string): string | undefined {
    const [type, _token] = token?.split(' ') ?? [];
    return type === 'Bearer' ? _token : undefined;
  }

  async login(params: LoginDto) {
    const user = await this.userService.findUserWithPasswordByEmail(
      params.email,
    );

    const result = bcrypt.compareSync(params.password, user.password);

    if (!result) {
      throw new UnauthorizedException('INVALID_PASSWORD');
    }

    const payload = { sub: user.id };

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      accessToken: await this.createAccessToken(payload),
      refreshToken: await this.createRefreshToken(payload),
    };
  }

  async createAccessToken(payload: { sub: number }) {
    return await this.jwtService.signAsync(payload, { expiresIn: '1m' });
  }

  async createRefreshToken(payload: { sub: number }) {
    return await this.jwtService.signAsync(payload, { expiresIn: '7d' });
  }

  async refresh(token: string) {
    const payload = await this.getTokenPayload(token);
    const refreshToken = await this.createAccessToken({ sub: payload.sub });
    const accessToken = await this.createRefreshToken({ sub: payload.sub });

    return {
      refreshToken,
      accessToken,
    };
  }

  setRefreshTokenToResponse(response: Response, jrt: string) {
    response.cookie('jrt', jrt, {
      httpOnly: true,
      secure: false,
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1d
    });
  }
}
