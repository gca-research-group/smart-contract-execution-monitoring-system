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
  CreateSmartContractExecutionDto,
  CreateSmartContractExecutionSchema,
  ListSmartContractExecutionDto,
  UpdateSmartContractExecutionDto,
  UpdateSmartContractExecutionSchema,
} from '@app/dtos/smart-contract-execution';
import { AuthGuard } from '@app/guards';
import { SmartContractExecutionService } from '@app/modules/smart-contract-execution/services';
import { ZodValidationPipe } from '@app/pipes/zod';

@UseGuards(AuthGuard)
@Controller('smart-contract-execution')
export class SmartContractExecutionController {
  constructor(private service: SmartContractExecutionService) {}

  @Get()
  index(@Query() query: ListSmartContractExecutionDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body(new ZodValidationPipe(CreateSmartContractExecutionSchema))
    createSmartContractExecutionDto: CreateSmartContractExecutionDto,
  ) {
    return this.service.create(createSmartContractExecutionDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateSmartContractExecutionSchema))
    updateSmartContractExecutionDto: UpdateSmartContractExecutionDto,
  ) {
    return this.service.update(id, updateSmartContractExecutionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Delete()
  removeAll() {
    return this.service.removeAll();
  }
}
