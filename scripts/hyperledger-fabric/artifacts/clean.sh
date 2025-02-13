#!/bin/bash
source ./scripts/config/_colors.sh
source ./scripts/config/_icons.sh

echo -e "${PROCESSING_ICON} Removing crypto materials."
rm -rf ./.docker/hyperledger-fabric/crypto-config

echo -e "${PROCESSING_ICON} Removing .tx artifacts."
rm -rf ./.docker/hyperledger-fabric/*.tx

echo -e "${PROCESSING_ICON} Removing genesis block."
rm -rf ./.docker/hyperledger-fabric/*.block

echo -e "${SUCCESS_ICON} Finished succesfully."
exit 0