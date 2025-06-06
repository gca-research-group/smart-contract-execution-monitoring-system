import { BlockchainPlatform } from '@app/models/enums';
import { IBlockchainConnectionService } from '@app/models/interfaces';
import { HyperledgerFabricConnectionService } from '@app/modules/hyperledger-fabric/services';

export class BlockchainConnectionFactory {
  private static instances: Map<string, IBlockchainConnectionService> =
    new Map();

  static getService<T = IBlockchainConnectionService>(
    platform: BlockchainPlatform,
  ): T {
    if (!this.instances.has(platform)) {
      switch (platform) {
        case BlockchainPlatform.HYPERLEDGER_FABRIC:
          this.instances.set(
            platform,
            new HyperledgerFabricConnectionService(),
          );
          break;
      }
    }

    return this.instances.get(platform)! as T;
  }
}
