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
  CreateSmartContractClauseDto,
  CreateSmartContractClauseSchema,
  ListSmartContractClauseDto,
  UpdateSmartContractClauseDto,
} from '@app/dtos/smart-contract-clause';
import { AuthGuard } from '@app/guards';
import { ZodValidationPipe } from '@app/pipes/zod';
import { SmartContractClauseService } from '@app/services/smart-contract-clause';

@UseGuards(AuthGuard)
@Controller('smart-contract/clause')
export class SmartContractClauseController {
  constructor(private service: SmartContractClauseService) {}

  @Get()
  index(@Query() query: ListSmartContractClauseDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  show(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(CreateSmartContractClauseSchema))
  create(@Body() createSmartContractClauseDto: CreateSmartContractClauseDto) {
    return this.service.create(createSmartContractClauseDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateSmartContractClauseDto: UpdateSmartContractClauseDto,
  ) {
    return this.service.update(id, updateSmartContractClauseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
