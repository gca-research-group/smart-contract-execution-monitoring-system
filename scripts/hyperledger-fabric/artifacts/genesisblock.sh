#!/bin/bash
source ./scripts/config/_colors.sh
source ./scripts/config/_icons.sh
source ./scripts/hyperledger-fabric/_variables.sh
source ./scripts/hyperledger-fabric/artifacts/_utils.sh

CONTAINER_NAME=hyperledger-fabric-tools

OUTPUT_BLOCK=./genesis.block
PROFILE=MultiOrdererGenesis
CONFIG_TX_COMMAND="configtxgen -outputBlock $OUTPUT_BLOCK -profile $PROFILE -channelID $SYSTEM_CHANNEL_ID"

generateGenesisBlock() {
  echo -e "${PROCESSING_ICON} Generating genesis block."
  command=$(docker exec -it $1 bash -c "$2" 2>&1)
  echo -e "${SUCCESS_ICON} Genesis block generated."
}

verifyIfConfigTxFileExists $CONFIG_TX_FILE
#verifyIfDockerComposeFileExists $HYPERLEDGER_FABRIC_TOOLS
verifyIfCryptoMaterialsExist $CRYPTO_CONFIG_FOLDER
#removeContainersInExecution $HYPERLEDGER_FABRIC_TOOLS
#runContainer $HYPERLEDGER_FABRIC_TOOLS
#verifyIfContainerIsRunning $CONTAINER_NAME
generateGenesisBlock $CONTAINER_NAME "$CONFIG_TX_COMMAND"
#removeContainersInExecution $HYPERLEDGER_FABRIC_TOOLS

echo -e "${SUCCESS_ICON} Finished succesfully."
exit 0