import { BlockchainPlatform } from '@app/models/enums';

export type UpdateBlockchainDto = {
  name: string;
  type: BlockchainPlatform;
  parameters: string;
  status: boolean;
  remarks: string;
};
