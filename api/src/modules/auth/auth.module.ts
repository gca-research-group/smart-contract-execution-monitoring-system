import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { UserModule } from '../user';
import { AuthService } from './services';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
