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

import { EventHandlerDto, EventHandlerSchema } from '@app/dtos';
import {
  CreateSmartContractDto,
  CreateSmartContractSchema,
  ListSmartContractDto,
  UpdateSmartContractDto,
  UpdateSmartContractSchema,
} from '@app/dtos/smart-contract';
import { AuthGuard } from '@app/guards';
import {
  SmartContractInboundQueueService,
  SmartContractService,
} from '@app/modules/smart-contract/services';
import { ZodValidationPipe } from '@app/pipes/zod';

@UseGuards(AuthGuard)
@Controller('smart-contract')
export class SmartContractController {
  constructor(
    private service: SmartContractService,
    private smartContractInboundQueueService: SmartContractInboundQueueService,
  ) {}

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
  create(
    @Body(new ZodValidationPipe(CreateSmartContractSchema))
    createSmartContractDto: CreateSmartContractDto,
  ) {
    return this.service.create(createSmartContractDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateSmartContractSchema))
    updateSmartContractDto: UpdateSmartContractDto,
  ) {
    return this.service.update(id, updateSmartContractDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Post('execute')
  @HttpCode(HttpStatus.CREATED)
  execute(
    @Body(new ZodValidationPipe(EventHandlerSchema))
    eventHandlerDto: EventHandlerDto,
  ) {
    return this.smartContractInboundQueueService.send(eventHandlerDto);
  }
}
