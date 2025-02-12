#!/bin/bash

source ./scripts/config/_colors.sh
source ./scripts/config/_icons.sh
source ./scripts/hyperledger-fabric/artifacts/_utils.sh

CONFIG_TX_FILE=./.docker/hyperledger-fabric/configtx.yml
DOCKER_COMPOSE_FILE=./.docker/hyperledger-fabric-tools.yml
CRYPTO_CONFIG_FOLDER=./.docker/hyperledger-fabric/crypto-config

CONTAINER_NAME=hyperledger-fabric-tools

ORGANIZATIONS="Manufacturer Distributor Retailer"
PROFILE=SupplyChainChannel
CHANNEL_ID=supplaychainchannel

generateAnchorPeersTx() {
  echo -e "${PROCESSING_ICON} Generating the anchor peer transaction: $1."
  OUTPUT_ANCHOR_PEERS_UPDATE=./${1}Anchors.tx
  CONFIG_TX_COMMAND="configtxgen -outputAnchorPeersUpdate $OUTPUT_ANCHOR_PEERS_UPDATE -profile $PROFILE -channelID $CHANNEL_ID -asOrg $1"
  exec_command=$(docker exec -it $CONTAINER_NAME bash -c "$CONFIG_TX_COMMAND" 2>&1)
  echo -e "${SUCCESS_ICON} Anchor peer transaction generated: $1."
}

verifyIfConfigTxFileExists $CONFIG_TX_FILE
verifyIfDockerComposeFileExists $DOCKER_COMPOSE_FILE
verifyIfCryptoMaterialsExist $CRYPTO_CONFIG_FOLDER
removeContainersInExecution $DOCKER_COMPOSE_FILE
runContainer $DOCKER_COMPOSE_FILE
verifyIfContainerIsRunning $CONTAINER_NAME

for organization in $ORGANIZATIONS; do
  generateAnchorPeersTx "$organization"
done

removeContainersInExecution $DOCKER_COMPOSE_FILE

echo -e "${SUCCESS_ICON} Finished succesfully."
exit 0