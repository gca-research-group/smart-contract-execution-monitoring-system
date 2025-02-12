#!/bin/bash

source ./scripts/config/_colors.sh
source ./scripts/config/_icons.sh
source ./scripts/hyperledger-fabric/artifacts/_utils.sh

CONFIG_TX_FILE=./.docker/hyperledger-fabric/configtx.yml
DOCKER_COMPOSE_FILE=./.docker/hyperledger-fabric-tools.yml
CRYPTO_CONFIG_FOLDER=./.docker/hyperledger-fabric/crypto-config

CONTAINER_NAME=hyperledger-fabric-tools

OUTPUT_CHANNEL=./supplychainchannel.tx
PROFILE=SupplyChainChannel
CHANNEL_ID=supplychainchannel
CONFIG_TX_COMMAND="configtxgen -outputCreateChannelTx $OUTPUT_CHANNEL -profile $PROFILE -channelID $CHANNEL_ID"

generateChannel() {
  echo -e "${PROCESSING_ICON} Generating the channel."
  exec_command=$(docker exec -it $1 bash -c "$2" 2>&1)
  echo -e "${SUCCESS_ICON} Channel generated."
}

verifyIfConfigTxFileExists $CONFIG_TX_FILE
verifyIfDockerComposeFileExists $DOCKER_COMPOSE_FILE
verifyIfCryptoMaterialsExist $CRYPTO_CONFIG_FOLDER
removeContainersInExecution $DOCKER_COMPOSE_FILE
runContainer $DOCKER_COMPOSE_FILE
verifyIfContainerIsRunning $CONTAINER_NAME
generateChannel $CONTAINER_NAME "$CONFIG_TX_COMMAND"
removeContainersInExecution $DOCKER_COMPOSE_FILE

echo -e "${SUCCESS_ICON} Finished succesfully."
exit 0