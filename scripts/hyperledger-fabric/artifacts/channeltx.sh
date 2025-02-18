#!/bin/bash
source ./scripts/config/_colors.sh
source ./scripts/config/_icons.sh
source ./scripts/hyperledger-fabric/artifacts/_utils.sh
source ./scripts/hyperledger-fabric/_variables.sh

CONTAINER_NAME=hyperledger-fabric-tools

OUTPUT_CHANNEL=./channel.tx
PROFILE=MultiChannel
CONFIG_TX_COMMAND="configtxgen -outputCreateChannelTx $OUTPUT_CHANNEL -profile $PROFILE -channelID $CHANNEL_ID"

generateChannel() {
  echo -e "${PROCESSING_ICON} Generating the channel."
  exec_command=$(docker exec -it $1 bash -c "$2" 2>&1)
  echo -e "${SUCCESS_ICON} Channel generated."
}

verifyIfConfigTxFileExists $CONFIG_TX_FILE
#verifyIfDockerComposeFileExists $HYPERLEDGER_FABRIC_TOOLS
verifyIfCryptoMaterialsExist $CRYPTO_CONFIG_FOLDER
#removeContainersInExecution $HYPERLEDGER_FABRIC_TOOLS
#runContainer $HYPERLEDGER_FABRIC_TOOLS
#verifyIfContainerIsRunning $CONTAINER_NAME
generateChannel $CONTAINER_NAME "$CONFIG_TX_COMMAND"
#removeContainersInExecution $HYPERLEDGER_FABRIC_TOOLS

echo -e "${SUCCESS_ICON} Finished succesfully."
exit 0