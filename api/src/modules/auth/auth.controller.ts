import { Request, Response } from 'express';

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';

import { LoginDto } from '@app/dtos';

import { AuthService } from './services';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() params: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const data = await this.authService.login(params);

    this.authService.setRefreshTokenToResponse(response, data.refreshToken);

    return {
      user: data.user,
      accessToken: data.accessToken,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const jrt = request.cookies['jrt'] as string;
      const data = await this.authService.refresh(jrt);

      this.authService.setRefreshTokenToResponse(response, data.refreshToken);

      return {
        accessToken: data.accessToken,
      };
    } catch (error) {
      response.clearCookie('jrt');
      throw new UnauthorizedException(error);
    }
  }
}
