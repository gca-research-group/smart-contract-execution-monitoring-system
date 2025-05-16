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
  CreateSmartContractDto,
  CreateSmartContractSchema,
  ListSmartContractDto,
  UpdateSmartContractDto,
} from '@app/dtos/smart-contract';
import { AuthGuard } from '@app/guards';
import { ZodValidationPipe } from '@app/pipes/zod';
import { SmartContractService } from '@app/services/smart-contract';

@UseGuards(AuthGuard)
@Controller('smart-contract')
export class SmartContractController {
  constructor(private service: SmartContractService) {}

  @Get()
  index(@Query() query: ListSmartContractDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(CreateSmartContractSchema))
  create(@Body() createSmartContractDto: CreateSmartContractDto) {
    return this.service.create(createSmartContractDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSmartContractDto: UpdateSmartContractDto,
  ) {
    return this.service.update(id, updateSmartContractDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }

  @Post(':id/execute')
  @HttpCode(HttpStatus.OK)
  execute(@Param('id') id: number) {
    return id;
  }
}
