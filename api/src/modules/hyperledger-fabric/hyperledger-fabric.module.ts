import { Module } from '@nestjs/common';

import { HyperledgerFabricConnectionService } from './services/hyperledger-fabric.service';

@Module({
  providers: [HyperledgerFabricConnectionService],
  exports: [HyperledgerFabricConnectionService],
})
export class HyperledgerFabricModule {}
