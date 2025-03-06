import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, CreateUserSchema } from 'src/models/dtos';
import { ZodValidationPipe } from 'src/pipes';
import { AuthGuard } from 'src/guards';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  index() {
    return this.userService.findAll();
  }

  @Get(':id')
  show(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
