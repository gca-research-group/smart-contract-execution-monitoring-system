import { Test, TestingModule } from '@nestjs/testing';
import { HyperledgerFabricConnectionService } from './connection.service';

describe('HyperledgerFabricConnectionService', () => {
  let service: HyperledgerFabricConnectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HyperledgerFabricConnectionService],
    }).compile();

    service = module.get<HyperledgerFabricConnectionService>(
      HyperledgerFabricConnectionService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should query the chaincode', async () => {
    const mspId = 'Org1MSP';

    const signcert = `
-----BEGIN CERTIFICATE-----
MIICKzCCAdGgAwIBAgIRAI1K5Yw9jVn25nPus5QKNFYwCgYIKoZIzj0EAwIwczEL
MAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNVBAcTDVNhbiBG
cmFuY2lzY28xGTAXBgNVBAoTEG9yZzEuZXhhbXBsZS5jb20xHDAaBgNVBAMTE2Nh
Lm9yZzEuZXhhbXBsZS5jb20wHhcNMjUwMzA1MTkzMTAwWhcNMzUwMzAzMTkzMTAw
WjBsMQswCQYDVQQGEwJVUzETMBEGA1UECBMKQ2FsaWZvcm5pYTEWMBQGA1UEBxMN
U2FuIEZyYW5jaXNjbzEPMA0GA1UECxMGY2xpZW50MR8wHQYDVQQDDBZVc2VyMUBv
cmcxLmV4YW1wbGUuY29tMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEkAAn+3qB
P9Aaru5Tegu0GOZZhqULp+AbxslC+wDHSbczN4+8WFXtPf30zLCRZcdcnkIynZ3n
7cB4U5IDZU7HzqNNMEswDgYDVR0PAQH/BAQDAgeAMAwGA1UdEwEB/wQCMAAwKwYD
VR0jBCQwIoAgTofw3UIs/JGkWiq5OPelIDo1a5avcVb28xyDDp1uT/UwCgYIKoZI
zj0EAwIDSAAwRQIhAIpF4vopmgWzXFICaCC8oYkpMjTnTO8RVT0WSqLoEQNxAiBu
raXGTRvwwMmzbEtvYkHIcpn+yv6762pD+LnERcrKgQ==
-----END CERTIFICATE-----
      `;

    const keystore = `
-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgHtUxqlCc9GJ1aZ4b
5abrwtD6xuPGWv/gjqu9K6BcqKmhRANCAASQACf7eoE/0Bqu7lN6C7QY5lmGpQun
4BvGyUL7AMdJtzM3j7xYVe09/fTMsJFlx1yeQjKdneftwHhTkgNlTsfO
-----END PRIVATE KEY-----
      `;

    const cacrt = `
-----BEGIN CERTIFICATE-----
MIICVzCCAf6gAwIBAgIRALuMaWLsMJkfONkTM7TV+QswCgYIKoZIzj0EAwIwdjEL
MAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNVBAcTDVNhbiBG
cmFuY2lzY28xGTAXBgNVBAoTEG9yZzEuZXhhbXBsZS5jb20xHzAdBgNVBAMTFnRs
c2NhLm9yZzEuZXhhbXBsZS5jb20wHhcNMjUwMzA1MTkzMTAwWhcNMzUwMzAzMTkz
MTAwWjB2MQswCQYDVQQGEwJVUzETMBEGA1UECBMKQ2FsaWZvcm5pYTEWMBQGA1UE
BxMNU2FuIEZyYW5jaXNjbzEZMBcGA1UEChMQb3JnMS5leGFtcGxlLmNvbTEfMB0G
A1UEAxMWdGxzY2Eub3JnMS5leGFtcGxlLmNvbTBZMBMGByqGSM49AgEGCCqGSM49
AwEHA0IABD42VwV9E9oD1xu8QVgSeE/PUQBGF+bwOHcpMLqwPVj6693IN7G4bD4b
RsmfAXsWKseSAAuv7kF4Hso3UU9q6SWjbTBrMA4GA1UdDwEB/wQEAwIBpjAdBgNV
HSUEFjAUBggrBgEFBQcDAgYIKwYBBQUHAwEwDwYDVR0TAQH/BAUwAwEB/zApBgNV
HQ4EIgQgfc9YOg/dr4/x8K4cNmL/mbjGgpqYC4o8Bgi7+IBS80wwCgYIKoZIzj0E
AwIDRwAwRAIgHEYRzSv+PcR039uEqbMvVnFvI1egOFb1wqJ6mbjAy/sCIDDf5PLh
SFRFDuEMdvFwyEYpBqIet7uadYzsmPP0q1QY
-----END CERTIFICATE-----
      `;

    const peerEndpoint = 'localhost:7051';
    const peerHostAlias = 'peer0.org1.example.com';
    const connection = service.connection(
      mspId,
      signcert,
      keystore,
      cacrt,
      peerEndpoint,
      peerHostAlias,
    );

    const channelName = 'orgschannel';
    const chaincodeName = 'test';
    const network = connection.getNetwork(channelName);
    const contract = network.getContract(chaincodeName);
    const resultBytes = await contract.evaluateTransaction('QueryAllProducts');
    const resultJson = new TextDecoder().decode(resultBytes);
    const result: unknown = JSON.parse(resultJson);
    expect(result).toBeTruthy();
  });
});
