#!/bin/bash
source ./scripts/config/_colors.sh
source ./scripts/config/_icons.sh

BASE_FOLDER=./.docker/hyperledger-fabric

echo -e "${PROCESSING_ICON} Removing crypto materials."
rm -rf $BASE_FOLDER/crypto-config

echo -e "${PROCESSING_ICON} Removing .tx artifacts."
rm -rf $BASE_FOLDER/artifacts/*.tx

echo -e "${PROCESSING_ICON} Removing genesis block."
rm -rf $BASE_FOLDER/artifacts/*.block

echo -e "${SUCCESS_ICON} Finished succesfully."
exit 0