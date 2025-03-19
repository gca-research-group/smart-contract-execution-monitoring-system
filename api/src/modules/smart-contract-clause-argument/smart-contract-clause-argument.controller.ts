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
  CreateSmartContractClauseArgumentDto,
  CreateSmartContractClauseArgumentSchema,
  ListSmartContractClauseArgumentDto,
  UpdateSmartContractClauseArgumentDto,
} from '@app/dtos/smart-contract-clause-argument';
import { AuthGuard } from '@app/guards';
import { ZodValidationPipe } from '@app/pipes/zod';
import { SmartContractClauseArgumentService } from '@app/services/smart-contract-clause-argument';

@UseGuards(AuthGuard)
@Controller('smart-contract/clause/argument')
export class SmartContractClauseArgumentController {
  constructor(private service: SmartContractClauseArgumentService) {}

  @Get()
  index(@Query() query: ListSmartContractClauseArgumentDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  show(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(CreateSmartContractClauseArgumentSchema))
  create(
    @Body()
    createSmartContractClauseArgumentDto: CreateSmartContractClauseArgumentDto,
  ) {
    return this.service.create(createSmartContractClauseArgumentDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body()
    updateSmartContractClauseArgumentDto: UpdateSmartContractClauseArgumentDto,
  ) {
    return this.service.update(id, updateSmartContractClauseArgumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
