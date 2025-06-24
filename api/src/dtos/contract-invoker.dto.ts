import { BlockchainPlatform } from '@app/models/enums';

export interface ContractInvokerDto<T = unknown> {
  blockchain: {
    id: string;
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
  clauseArguments?: {
    id: string;
    name: string;
    value: string;
  }[];
}
