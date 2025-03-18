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
  CreateBlockchainDto,
  CreateBlockchainSchema,
  ListBlockchainDto,
  UpdateBlockchainDto,
} from '@app/dtos/blockchain';
import { AuthGuard } from '@app/guards';
import { ZodValidationPipe } from '@app/pipes/zod';
import { BlockchainService } from '@app/services/blockchain';

@UseGuards(AuthGuard)
@Controller('blockchain')
export class BlockchainController {
  constructor(private service: BlockchainService) {}

  @Get()
  index(@Query() query: ListBlockchainDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  show(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(CreateBlockchainSchema))
  create(@Body() createBlockchainDto: CreateBlockchainDto) {
    return this.service.create(createBlockchainDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateBlockchainDto: UpdateBlockchainDto,
  ) {
    return this.service.update(id, updateBlockchainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
