export interface SmartContractClauseArgument {
  _id: string;
  name: string;
  type: string;
}

export interface SmartContractClause {
  _id: string;
  name: string;
  clauseArguments?: SmartContractClauseArgument[];
}

export interface SmartContract {
  _id: string;
  name: string;
  clauses?: SmartContractClause[];
  createdAt: Date;
  updatedAt: Date;
}
