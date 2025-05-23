export interface IBlockchainConnectionService<
  ConnectionParameters = unknown,
  ConnectResponse = unknown,
  Connection = unknown,
  InvokeResponse = unknown,
> {
  connect(parameters: ConnectionParameters): Promise<ConnectResponse>;
  invoke(
    connection: Connection,
    smartContractName: string,
    clauseName: string,
    args?: { name: string; value: string }[],
  ): Promise<InvokeResponse>;
}
