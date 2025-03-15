import { Module } from '@nestjs/common';

import { AuthService } from '@app/services/auth';

import { AuthController } from './auth.controller';
import { UserModule } from '../user';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
