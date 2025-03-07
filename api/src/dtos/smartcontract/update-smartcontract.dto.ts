import { BlockchainType } from '@app/models';

export type UpdateSmartContractDto = {
  name: string;
  blockchainType: BlockchainType;
  content: string;
  status: boolean;
  remarks: string;
};
