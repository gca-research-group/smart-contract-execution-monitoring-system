import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthGuard } from '@app/guards';
import { User } from '@app/models';
import { AuthService } from '@app/services/auth';
import { UserService } from '@app/services/user';

import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, AuthService, AuthGuard],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
