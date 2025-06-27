import { ListBaseDto } from '../list-base.dto';

export interface ListSmartContractExecutionDto extends ListBaseDto {
  smartContractId?: string;
  smartContractName?: string;
  blockchainPlatform: string;
  status: 'FAIL' | 'SUCCESS' | 'PENDING' | 'ALL';
}
