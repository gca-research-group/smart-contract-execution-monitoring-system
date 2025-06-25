import { BlockchainPlatform } from '@app/models/enums';

export interface ContractInvokerClauseArgument {
  id: string;
  value: string;
  name: string;
}

export interface ContractInvokerClause {
  id: string;
  name: string;
}

export interface ContractInvokerSmartContract {
  id: string;
  name: string;
}

export interface ContractInvokerBlockchainDto<T = unknown> {
  id: string;
  parameters: T;
  platform: BlockchainPlatform;
}

export interface ContractInvokerDto<T = unknown> {
  blockchain: ContractInvokerBlockchainDto<T>;
  smartContract: ContractInvokerSmartContract;
  clause: ContractInvokerClause;
  clauseArguments?: ContractInvokerClauseArgument[];
}
