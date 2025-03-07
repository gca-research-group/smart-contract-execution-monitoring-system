import { Module } from '@nestjs/common';
import { HyperledgerFabricConnectionService } from './hyperledger-fabric.service';

@Module({
  providers: [HyperledgerFabricConnectionService],
  exports: [HyperledgerFabricConnectionService],
})
export class BlockchainConnetionsModule {}
