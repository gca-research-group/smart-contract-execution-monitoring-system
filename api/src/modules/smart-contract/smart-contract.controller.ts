import {
  Body,
  Controller,
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
  CreateSmartContractDto,
  CreateSmartContractSchema,
  ListSmartContractDto,
  UpdateSmartContractDto,
} from '@app/dtos/smart-contract';
import { AuthGuard } from '@app/guards';
import { ZodValidationPipe } from '@app/pipes/zod';
import { SmartContractService } from '@app/services/smart-contract';

@UseGuards(AuthGuard)
@Controller('smartcontract')
export class SmartContractController {
  constructor(private smartContractService: SmartContractService) {}

  @Get()
  index(@Query() query: ListSmartContractDto) {
    return this.smartContractService.findAll(query);
  }

  @Get(':id')
  show(@Param('id') id: number) {
    return this.smartContractService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(CreateSmartContractSchema))
  create(@Body() createSmartContractDto: CreateSmartContractDto) {
    return this.smartContractService.create(createSmartContractDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateSmartContractDto: UpdateSmartContractDto,
  ) {
    return this.smartContractService.update(id, updateSmartContractDto);
  }
}
