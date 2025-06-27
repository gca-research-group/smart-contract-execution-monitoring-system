import { BlockchainPlatform } from '@app/models/enums';
import { IBlockchainConnectionService } from '@app/models/interfaces';
import { HyperledgerFabricConnectionService } from '@app/modules/hyperledger-fabric/services';

export class BlockchainConnectionFactory {
  private static instances: Map<string, IBlockchainConnectionService> =
    new Map();

  private static connections: Map<string, unknown> = new Map();

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

  static async getConnection<T, R>(
    blockchainId: string,
    blockchainPlatform: BlockchainPlatform,
    parameters: R,
  ) {
    const service = this.getService(blockchainPlatform);

    if (!this.connections.has(blockchainId)) {
      this.connections.set(blockchainId, await service.connect(parameters));
    }

    const conn = this.connections.get(blockchainId) as T;

    return conn;
  }
}
