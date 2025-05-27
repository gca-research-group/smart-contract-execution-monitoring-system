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

interface ExecutionPayload {
  blockchain: Blockchain;
  smartContract: SmartContract;
  clause: Clause;
  arguments: Argument[];
}

export interface ExecutionResult {
  _id: string;
  payload: ExecutionPayload;
  result: unknown;
  createdAt: Date;
  updatedAt: Date;
}
