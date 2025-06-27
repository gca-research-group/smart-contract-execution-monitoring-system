import { ListBaseDto } from '../list-base.dto';

export interface ListSmartContractDto extends ListBaseDto {
  name: string;
  blockchainPlatform: string;
}
