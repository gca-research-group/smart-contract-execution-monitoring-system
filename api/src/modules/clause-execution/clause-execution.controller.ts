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
  UsePipes,
} from '@nestjs/common';

import {
  CreateClauseExecutionDto,
  CreateClauseExecutionSchema,
  ListClauseExecutionDto,
  UpdateClauseExecutionDto,
  UpdateClauseExecutionSchema,
} from '@app/dtos/clause-execution';
import { AuthGuard } from '@app/guards';
import { ZodValidationPipe } from '@app/pipes/zod';
import { ClauseExecutionService } from '@app/services/clause-execution';

@UseGuards(AuthGuard)
@Controller('clause-execution')
export class ClauseExecutionController {
  constructor(private service: ClauseExecutionService) {}

  @Get()
  index(@Query() query: ListClauseExecutionDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(CreateClauseExecutionSchema))
  create(@Body() createClauseExecutionDto: CreateClauseExecutionDto) {
    return this.service.create(createClauseExecutionDto);
  }

  @Put(':id')
  @UsePipes(new ZodValidationPipe(UpdateClauseExecutionSchema))
  update(
    @Param('id') id: string,
    @Body() updateClauseExecutionDto: UpdateClauseExecutionDto,
  ) {
    return this.service.update(id, updateClauseExecutionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Post(':id/execute')
  @HttpCode(HttpStatus.OK)
  execute(@Param('id') id: string) {
    return id;
  }
}
