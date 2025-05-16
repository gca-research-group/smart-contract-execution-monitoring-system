export interface HyperledgerFabricConfig {
  mspId: string;
  signcert: string;
  keystore: string;
  cacrt: string;
  peerEndpoint: string;
  peerHostAlias: string;
}
