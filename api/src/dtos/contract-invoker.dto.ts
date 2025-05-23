import { BlockchainPlatform } from '@app/models/enums';

export type ContractInvokerDto = {
  blockchainParameters: unknown;
  blockchainPlatform: BlockchainPlatform;
  smartContractName: string;
  smartContractId: string;
  clauseName: string;
  arguments?: {
    name: string | undefined;
    value: string;
  }[];
};
