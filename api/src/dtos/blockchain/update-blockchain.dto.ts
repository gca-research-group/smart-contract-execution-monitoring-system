import { BlockchainPlatform } from '@app/models';

export type UpdateBlockchainDto = {
  name: string;
  type: BlockchainPlatform;
  parameters: string;
  status: boolean;
  remarks: string;
};
