#!/bin/bash

# Set variables
ORG_NAME="org1.example.com"
PEER_NAME="peer0.org1.example.com"
ORDERER_NAME="orderer.example.com"
CHANNEL_NAME="examplechannel"

# Set paths
CRYPTO_PATH=".docker/hyperledger-fabric/artifacts/crypto-config"
TLS_PATH="$CRYPTO_PATH/peerOrganizations/$ORG_NAME/peers/$PEER_NAME/tls"
ORDERER_TLS_PATH="$CRYPTO_PATH/ordererOrganizations/example.com/orderers/$ORDERER_NAME/tls"
CA_PATH="$CRYPTO_PATH/peerOrganizations/$ORG_NAME/ca"

# Generate connection profile
cat <<EOF > connection-org1.json
{
  "name": "fabric-network",
  "version": "1.0.0",
  "client": {
    "organization": "Org1",
    "connection": {
      "timeout": {
        "peer": {
          "endorser": "300"
        },
        "orderer": "300"
      }
    }
  },
  "organizations": {
    "Org1": {
      "mspid": "Org1MSP",
      "peers": [
        "$PEER_NAME"
      ],
      "certificateAuthorities": [
        "ca.$ORG_NAME"
      ]
    }
  },
  "peers": {
    "$PEER_NAME": {
      "url": "grpcs://localhost:7051",
      "tlsCACerts": {
        "pem": "$(awk 'NF {sub(/\\n/, "")} 1' $TLS_PATH/ca.crt)"
      },
      "grpcOptions": {
        "ssl-target-name-override": "$PEER_NAME",
        "hostnameOverride": "$PEER_NAME"
      }
    }
  },
  "certificateAuthorities": {
    "ca.$ORG_NAME": {
      "url": "https://localhost:7054",
      "caName": "ca-org1",
      "tlsCACerts": {
        "pem": "$(awk 'NF {sub(/\\n/, "")} 1' $CA_PATH/ca.org1.example.com-cert.pem)"
      },
      "httpOptions": {
        "verify": false
      }
    }
  },
  "orderers": {
    "$ORDERER_NAME": {
      "url": "grpcs://localhost:7050",
      "tlsCACerts": {
        "pem": "$(awk 'NF {sub(/\\n/, "")} 1' $ORDERER_TLS_PATH/ca.crt)"
      },
      "grpcOptions": {
        "ssl-target-name-override": "$ORDERER_NAME",
        "hostnameOverride": "$ORDERER_NAME"
      }
    }
  }
}
EOF

echo "connection-org1.json has been generated successfully."
