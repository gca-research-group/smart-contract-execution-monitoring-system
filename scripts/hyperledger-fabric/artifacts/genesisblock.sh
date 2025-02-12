#!/bin/bash

source ./scripts/config/_colors.sh
source ./scripts/config/_icons.sh
source ./scripts/hyperledger-fabric/artifacts/_utils.sh

CONFIG_TX_FILE=./.docker/hyperledger-fabric/configtx.yml
DOCKER_COMPOSE_FILE=./.docker/hyperledger-fabric-tools.yml
CRYPTO_CONFIG_FOLDER=./.docker/hyperledger-fabric/crypto-config

CONTAINER_NAME=hyperledger-fabric-tools

OUTPUT_BLOCK=./SupplayChainGenesis.block
PROFILE=SupplyChainOrdererGenesis
CHANNEL_ID=ordererchannel
CONFIG_TX_COMMAND="configtxgen -outputBlock $OUTPUT_BLOCK -profile $PROFILE -channelID $CHANNEL_ID"

generateGenesisBlock() {
  echo -e "${PROCESSING_ICON} Generating genesis block."
  exec_command=$(docker exec -it $1 bash -c "$2" 2>&1)  
  echo -e "${SUCCESS_ICON} Genesis block generated."
}

verifyIfConfigTxFileExists $CONFIG_TX_FILE
verifyIfDockerComposeFileExists $DOCKER_COMPOSE_FILE
verifyIfCryptoMaterialsExist $CRYPTO_CONFIG_FOLDER
removeContainersInExecution $DOCKER_COMPOSE_FILE
runContainer $DOCKER_COMPOSE_FILE
verifyIfContainerIsRunning $CONTAINER_NAME
generateGenesisBlock $CONTAINER_NAME "$CONFIG_TX_COMMAND"
removeContainersInExecution $DOCKER_COMPOSE_FILE

echo -e "${SUCCESS_ICON} Finished succesfully."
exit 0