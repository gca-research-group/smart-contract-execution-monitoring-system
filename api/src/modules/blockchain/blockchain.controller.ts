import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import {
  CreateBlockchainDto,
  CreateBlockchainSchema,
} from '@app/dtos/blockchain';
import { AuthGuard } from '@app/guards';
import { ZodValidationPipe } from '@app/pipes';

import { BlockchainService } from './blockchain.service';

@UseGuards(AuthGuard)
@Controller('blockchain')
export class BlockchainController {
  constructor(private blockchainService: BlockchainService) {}

  @Get()
  index() {
    return this.blockchainService.findAll();
  }

  @Get(':id')
  show(@Param('id') id: number) {
    return this.blockchainService.findOne(id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(CreateBlockchainSchema))
  create(@Body() createBlockchainDto: CreateBlockchainDto) {
    return this.blockchainService.create(createBlockchainDto);
  }
}
