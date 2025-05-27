import { BlockchainPlatform } from '@app/models/enums';

export interface ContractInvokerDto<T = unknown> {
  blockchain: {
    parameters: T;
    platform: BlockchainPlatform;
  };
  smartContract: {
    id: string;
    name: string;
  };
  clause: {
    id: string;
    name: string;
  };
  arguments?: {
    id: string;
    name: string;
    value: string;
  }[];
}
