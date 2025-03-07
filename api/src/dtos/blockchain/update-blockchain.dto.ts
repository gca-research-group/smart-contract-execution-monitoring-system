import { BlockchainType } from '@app/models';

export type UpdateBlockchainDto = {
  name: string;
  type: BlockchainType;
  parameters: string;
  status: boolean;
  remarks: string;
};
