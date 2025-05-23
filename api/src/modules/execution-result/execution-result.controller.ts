import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  CreateExecutionResultDto,
  CreateExecutionResultSchema,
  ListExecutionResultDto,
  UpdateExecutionResultDto,
  UpdateExecutionResultSchema,
} from '@app/dtos/execution-result';
import { AuthGuard } from '@app/guards';
import { ExecutionResultService } from '@app/modules/execution-result/services';
import { ZodValidationPipe } from '@app/pipes/zod';

@UseGuards(AuthGuard)
@Controller('execution-result')
export class ExecutionResultController {
  constructor(private service: ExecutionResultService) {}

  @Get()
  index(@Query() query: ListExecutionResultDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body(new ZodValidationPipe(CreateExecutionResultSchema))
    createExecutionResultDto: CreateExecutionResultDto,
  ) {
    return this.service.create(createExecutionResultDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateExecutionResultSchema))
    updateExecutionResultDto: UpdateExecutionResultDto,
  ) {
    return this.service.update(id, updateExecutionResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
