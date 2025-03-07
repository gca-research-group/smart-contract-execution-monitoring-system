import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards';
import { BlockchainService } from './blockchain.service';
import { ZodValidationPipe } from 'src/pipes';
import { CreateBlockchainDto, CreateBlockchainSchema } from 'src/models/dtos';

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
