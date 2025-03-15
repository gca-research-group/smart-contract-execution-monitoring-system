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
  CreateBlockchainDto,
  CreateBlockchainSchema,
  UpdateBlockchainDto,
} from '@app/dtos/blockchain';
import { AuthGuard } from '@app/guards';
import { ZodValidationPipe } from '@app/pipes';
import { BlockchainService } from '@app/services/blockchain';

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
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(CreateBlockchainSchema))
  create(@Body() createBlockchainDto: CreateBlockchainDto) {
    return this.blockchainService.create(createBlockchainDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateBlockchainDto: UpdateBlockchainDto,
  ) {
    return this.blockchainService.update(id, updateBlockchainDto);
  }
}
