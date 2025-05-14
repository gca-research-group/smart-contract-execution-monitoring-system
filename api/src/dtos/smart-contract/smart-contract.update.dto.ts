import { BlockchainPlatform } from '@app/models';

export type File = { name: string; content: string };

export type UpdateSmartContractDto = {
  name: string;
  blockchainPlatform: BlockchainPlatform;
  files: File[];
  status: boolean;
  remarks: string;
};
