import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import {
  CreateSmartContractDto,
  CreateSmartContractSchema,
  UpdateSmartContractDto,
} from '@app/dtos/smartcontract';
import { AuthGuard } from '@app/guards';
import { ZodValidationPipe } from '@app/pipes';
import { SmartContractService } from '@app/services/smartcontract';

@UseGuards(AuthGuard)
@Controller('smartcontract')
export class SmartContractController {
  constructor(private smartContractService: SmartContractService) {}

  @Get()
  index() {
    return this.smartContractService.findAll();
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
