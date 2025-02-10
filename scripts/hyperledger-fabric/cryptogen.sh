#!/bin/bash

source ./scripts/config/_colors.sh
source ./scripts/config/_icons.sh

CRYPTO_CONFIG_FOLDER=./.docker/hyperledger-fabric/crypto-config
CRYPTO_CONFIG_FILE=./.docker/hyperledger-fabric/crypto-config.yml
GITIGNORE_FILE=$(dirname $CRYPTO_CONFIG_FOLDER)/.gitignore
DOCKER_COMPOSE_FILE=./.docker/hyperledger-fabric/cryptogen.yml

if [[ ! -f $CRYPTO_CONFIG_FILE ]]; then
  echo -e "${RED}The crypto-config file has not been found:${NC} $CRYPTO_CONFIG_FILE"
  exit 1
fi

if [[ ! -f $DOCKER_COMPOSE_FILE ]]; then
  echo -e "${RED}The docker compose file has not been found:${NC} $DOCKER_COMPOSE_FILE"
  exit 1
fi

docker compose -f $DOCKER_COMPOSE_FILE down 2>&1 || true

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
    echo -e "${WARN}  Failed to remove directory $CRYPTO_CONFIG_FOLDER: $errors"
  else
    echo -e "${SUCCESS} The crypto-config folder has been deleted."
  fi
fi

sleep 1

errors=$(docker compose -f $DOCKER_COMPOSE_FILE up -d 2>&1 > /dev/null)

if [[ -n "$errors" && "$errors" != *"Created"* ]]; then
  echo -e "${RED}Failed to create the crypto materials:${NC}"
  echo "$errors"
  exit 1
else
  if [[ ! -f $GITIGNORE_FILE ]]; then
    echo "$(basename $CRYPTO_CONFIG_FOLDER)" > $GITIGNORE_FILE
  else
    if ! grep -q "$(basename $CRYPTO_CONFIG_FOLDER)" $GITIGNORE_FILE; then
      echo "Adding $(basename $CRYPTO_CONFIG_FOLDER) to .gitignore"
    fi
  fi
fi

echo -e "${SUCCESS} Crypto materials generated."

sleep 3

errors=$(docker compose -f $DOCKER_COMPOSE_FILE down 2>&1 > /dev/null)

if [[ -n "$errors" && "$errors" != *"Removed"* ]]; then
  echo -e "${RED}Failed to remove the containers. Either try rerunning this script or run it on your own:${NC}"
  echo "$errors"
  exit 1
fi

echo -e "${SUCCESS} Containers deleted."
echo -e "${SUCCESS} Finished succesfully."
exit 0