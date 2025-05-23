import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthGuard } from '@app/guards';
import { User } from '@app/models';

import { UserService } from './services';
import { UserController } from './user.controller';
import { AuthService } from '../auth/services';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, AuthService, AuthGuard],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
