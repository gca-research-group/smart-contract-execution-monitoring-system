import { BlockchainPlatform } from '@app/models';

export type UpdateSmartContractDto = {
  name: string;
  blockchainPlatform: BlockchainPlatform;
  content: string;
  status: boolean;
  remarks: string;
};
