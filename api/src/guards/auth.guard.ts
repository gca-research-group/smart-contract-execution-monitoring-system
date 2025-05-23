import { Request } from 'express';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { AuthService } from '@app/modules/auth/services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.authService.removeTokenPrefix(
      request.headers.authorization,
    );

    request['user'] = await this.authService.getTokenPayload(token);

    return true;
  }
}
