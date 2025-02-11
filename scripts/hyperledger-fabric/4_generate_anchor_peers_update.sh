#!/bin/bash

source ./scripts/config/_colors.sh
source ./scripts/config/_icons.sh

CONFIG_TX_FILE=./.docker/hyperledger-fabric/configtx.yml
DOCKER_COMPOSE_FILE=./.docker/fabric-tools.yml
CRYPTO_CONFIG_FOLDER=./.docker/hyperledger-fabric/crypto-config

GITIGNORE_FILE=$(dirname $CRYPTO_CONFIG_FOLDER)/.gitignore

CONTAINER_NAME=fabric-tools

ORGANIZATIONS="Manufacturer Distributor Retailer"
PROFILE=SupplyChainChannel
CHANNEL_ID=supplayChainChannel

verifyIfTheConfigTxFileExists() {
  echo -e "${PROCESSING_ICON} Verifying if the config file exists."
  if [[ ! -f $CONFIG_TX_FILE ]]; then
    echo -e "${RED}The configtx file has not been found:${NC} $CONFIG_TX_FILE"
    exit 1
  fi
}

verifyIfTheDockerComposeFileExists() {
  echo -e "${PROCESSING_ICON} Verifying if the docker-compose file exists."

  if [[ ! -f $DOCKER_COMPOSE_FILE ]]; then
    echo -e "${RED}The docker compose file has not been found:${NC} $DOCKER_COMPOSE_FILE"
    exit 1
  fi
}

verifyIfTheContainerIsRunning() {
  echo -e "${PROCESSING_ICON} Verifying if the container is running."
  container_status=$(docker inspect -f '{{.State.Running}}' $CONTAINER_NAME 2>&1)

  if [[ "$container_status" != "true" ]]; then
    echo -e "${RED}The container is not running:${NC}"
    echo "$container_status"
    exit 1
  fi
}

verifyIfTheCryptoMaterialsExist() {
  echo -e "${PROCESSING_ICON} Verifying if the crypto materials exist."

  if [[ ! -d $CRYPTO_CONFIG_FOLDER ]]; then
    echo -e "${RED}Crypto materials do not exists:${NC} $CRYPTO_CONFIG_FOLDER"
    exit 1
  fi
}

removeContainersInExecution() {
  echo -e "${PROCESSING_ICON} Deleting containers in execution."
  errors=$(docker compose -f $DOCKER_COMPOSE_FILE down 2>&1 > /dev/null)

  if [[ -n "$errors" && "$errors" != *"Removed"* ]]; then
    echo -e "${RED}Failed to remove the containers:${NC}"
    echo "$errors"
    exit 1
  fi

  echo -e "${SUCCESS_ICON} Containers deleted."
}

runTheContainer() {
  echo -e "${PROCESSING_ICON} Starting the container."
  errors=$(docker compose -f $DOCKER_COMPOSE_FILE up -d 2>&1 > /dev/null)
  echo -e "${SUCCESS_ICON} Container started."
}

generateAnchorPeersTx() {
  echo -e "${PROCESSING_ICON} Generating the anchor peer transaction: $1."
  OUTPUT_ANCHOR_PEERS_UPDATE=./${1}Anchors.tx
  CONFIG_TX_COMMAND="configtxgen -outputAnchorPeersUpdate $OUTPUT_ANCHOR_PEERS_UPDATE -profile $PROFILE -channelID $CHANNEL_ID -asOrg $1"
  exec_command=$(docker exec -it $CONTAINER_NAME bash -c "$CONFIG_TX_COMMAND" 2>&1)
  
  if [[ ! -f $GITIGNORE_FILE ]]; then
    echo "$(basename $OUTPUT_ANCHOR_PEERS_UPDATE)" > $GITIGNORE_FILE
  else
    if ! grep -q "$(basename $OUTPUT_ANCHOR_PEERS_UPDATE)" $GITIGNORE_FILE; then
      echo -e "${PROCESSING_ICON} Adding $(basename $OUTPUT_ANCHOR_PEERS_UPDATE) to .gitignore."
      echo "$(basename $OUTPUT_ANCHOR_PEERS_UPDATE)" >> "$GITIGNORE_FILE"
    fi
  fi
  
  echo -e "${SUCCESS_ICON} Anchor peer transaction generated: $1."
}

verifyIfTheConfigTxFileExists
verifyIfTheDockerComposeFileExists
verifyIfTheCryptoMaterialsExist
removeContainersInExecution
runTheContainer
verifyIfTheContainerIsRunning
for organization in $ORGANIZATIONS; do
    generateAnchorPeersTx "$organization"
done
removeContainersInExecution

echo -e "${SUCCESS_ICON} Finished succesfully."
exit 0