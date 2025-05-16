export interface SmartContractClauseArgument {
  _id: string;
  name: string;
  type: string;
}

export interface SmartContractClause {
  _id: string;
  name: string;
  arguments?: SmartContractClauseArgument[];
}

export interface SmartContract {
  _id: string;
  name: string;
  clauses?: SmartContractClause[];
  createdAt: Date;
  updatedAt: Date;
}
