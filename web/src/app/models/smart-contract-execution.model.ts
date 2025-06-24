interface Blockchain {
  id: string;
  platform: string;
}

interface SmartContract {
  id: string;
  name: string;
}

interface Clause {
  id: string;
  name: string;
}

interface Argument {
  id: string;
  name: string;
  value: string;
}

interface SmartContractExecutionPayload {
  blockchain: Blockchain;
  smartContract: SmartContract;
  clause: Clause;
  clauseArguments: Argument[];
}

export interface SmartContractExecution {
  _id: string;
  payload: SmartContractExecutionPayload;
  result: unknown;
  createdAt: Date;
  updatedAt: Date;
}
