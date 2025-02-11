#!/bin/bash

source ./scripts/config/_colors.sh
source ./scripts/config/_icons.sh

CRYPTO_CONFIG_FOLDER=./.docker/hyperledger-fabric/crypto-config
CRYPTO_CONFIG_FILE=./.docker/hyperledger-fabric/crypto-config.yml
GITIGNORE_FILE=$(dirname $CRYPTO_CONFIG_FOLDER)/.gitignore
DOCKER_COMPOSE_FILE=./.docker/fabric-tools.yml
CONTAINER_NAME=fabric-tools
CRYPTO_CONFIG_COMMAND="cryptogen generate --config=/etc/hyperledger/fabric/crypto-config.yml --output=/etc/hyperledger/fabric/crypto-config"

verifyIfTheCryptoConfigFileExists() {
  echo -e "${PROCESSING_ICON} Verifying if the config file exists."
  if [[ ! -f $CRYPTO_CONFIG_FILE ]]; then
    echo -e "${RED}The crypto-config file has not been found:${NC} $CRYPTO_CONFIG_FILE"
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

removeTheCryptoConfigFolder() {
  while getopts ":c:" opt; do
    case $opt in
      c) clear="$OPTARG"
      ;;
      \?) echo -e "${RED}Invalid option -$OPTARG${NC}" >&2
      ;;
    esac
  done

  if  [[ "$clear" = "true" && -d $CRYPTO_CONFIG_FOLDER ]]; then
    errors=$(rm -r $CRYPTO_CONFIG_FOLDER 2>&1 > /dev/null)
    if [[ -n "$errors" ]]; then 
      echo -e "${WARN_ICON}  Failed to remove directory $CRYPTO_CONFIG_FOLDER: $errors"
    else
      echo -e "${SUCCESS_ICON} The crypto-config folder has been deleted."
    fi
  fi

  sleep 1
}

runTheContainer() {
  echo -e "${PROCESSING_ICON} Starting the container."
  errors=$(docker compose -f $DOCKER_COMPOSE_FILE up -d 2>&1 > /dev/null)
  echo -e "${SUCCESS_ICON} Container started."
}

generateCryptoMaterials() {
  echo -e "${PROCESSING_ICON} Generating Crypto Materials."
  exec_command=$(docker exec -it $CONTAINER_NAME bash -c "$CRYPTO_CONFIG_COMMAND" 2>&1)

  if [[ $? -ne 0 ]]; then
    echo -e "${RED}Failed to execute command in the container:${NC}"
    echo "$exec_command"
    exit 1
  fi

  if [[ ! -f $GITIGNORE_FILE ]]; then
    echo "$(basename $CRYPTO_CONFIG_FOLDER)" > $GITIGNORE_FILE
  else
    if ! grep -q "$(basename $CRYPTO_CONFIG_FOLDER)" $GITIGNORE_FILE; then
      echo -e "${PROGRESS_ICON} $(basename $CRYPTO_CONFIG_FOLDER) to .gitignore"
      echo "$(basename $CRYPTO_CONFIG_FOLDER)" >> "$GITIGNORE_FILE"
    fi
  fi

  echo -e "${SUCCESS_ICON} Crypto materials generated."
}

verifyIfTheCryptoConfigFileExists
verifyIfTheDockerComposeFileExists
verifyIfTheCryptoMaterialsExists
removeContainersInExecution
removeTheCryptoConfigFolder
runTheContainer
generateCryptoMaterials
removeContainersInExecution

echo -e "${SUCCESS_ICON} Finished succesfully."
exit 0