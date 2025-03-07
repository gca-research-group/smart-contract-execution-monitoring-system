import { Injectable } from '@nestjs/common';
import * as grpc from '@grpc/grpc-js';
import {
  connect,
  hash,
  Identity,
  Signer,
  signers,
} from '@hyperledger/fabric-gateway';
import * as crypto from 'crypto';

@Injectable()
export class HyperledgerFabricConnectionService {
  connection(
    mspId: string,
    signcert: string,
    keystore: string,
    cacrt: string,
    peerEndpoint: string,
    peerHostAlias: string,
  ) {
    const client = this.newGrpcConnection(
      Buffer.from(cacrt, 'utf8'),
      peerEndpoint,
      peerHostAlias,
    );

    return connect({
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
}
