import * as grpc from '@grpc/grpc-js';
import {
  connect as connectToFabric,
  hash,
  Identity,
  Network,
  Signer,
  signers,
} from '@hyperledger/fabric-gateway';
import * as crypto from 'crypto';

import { Injectable } from '@nestjs/common';

import {
  HyperledgerFabricConfig,
  IBlockchainConnectionService,
} from '@app/models/interfaces';

@Injectable()
export class HyperledgerFabricConnectionService
  implements IBlockchainConnectionService
{
  connect(parameters: HyperledgerFabricConfig) {
    const {
      mspId,
      signcert,
      keystore,
      cacrt,
      peerEndpoint,
      peerHostAlias,
      channel,
    } = parameters;

    const client = this.newGrpcConnection(
      Buffer.from(cacrt, 'utf8'),
      peerEndpoint,
      peerHostAlias,
    );

    const connection = connectToFabric({
      client,
      identity: this.newIdentity(mspId, Buffer.from(signcert)),
      signer: this.newSigner(keystore),
      hash: hash.sha256,
      // Default timeouts for different gRPC calls
      evaluateOptions: () => {
        return { deadline: Date.now() + 5000 }; // 5 seconds
      },
      endorseOptions: () => {
        return { deadline: Date.now() + 15000 }; // 15 seconds
      },
      submitOptions: () => {
        return { deadline: Date.now() + 5000 }; // 5 seconds
      },
      commitStatusOptions: () => {
        return { deadline: Date.now() + 60000 }; // 1 minute
      },
    });

    const network = connection.getNetwork(channel);

    return Promise.resolve(network);
  }

  private newGrpcConnection(
    cert: Buffer,
    peerEndpoint: string,
    peerHostAlias: string,
  ): grpc.Client {
    const tlsCredentials = grpc.credentials.createSsl(cert);
    return new grpc.Client(peerEndpoint, tlsCredentials, {
      'grpc.ssl_target_name_override': peerHostAlias,
    });
  }

  private newSigner(cert: string): Signer {
    const privateKey = crypto.createPrivateKey(cert);
    return signers.newPrivateKeySigner(privateKey);
  }

  private newIdentity(mspId: string, cert: Buffer): Identity {
    return { mspId, credentials: Buffer.from(cert) };
  }

  async invoke(
    network: Network,
    smartContractName: string,
    clauseName: string,
  ) {
    const contract = network.getContract(smartContractName);
    const resultBytes = await contract.evaluateTransaction(clauseName);
    const resultJson = new TextDecoder().decode(resultBytes);
    return JSON.parse(resultJson) as unknown;
  }
}
