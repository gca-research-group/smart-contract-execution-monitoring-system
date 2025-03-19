export interface SmartContractClauseArgument {
  id: number;
  name: string;
  type: string;
}

export interface SmartContractClause {
  id: number;
  name: string;
  arguments?: SmartContractClauseArgument[];
}

export interface SmartContract {
  id: number;
  name: string;
  clauses?: SmartContractClause[];
  createdAt: Date;
  updatedAt: Date;
}
