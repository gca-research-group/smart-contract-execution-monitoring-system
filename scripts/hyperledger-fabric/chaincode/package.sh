#!/bin/bash
source ./scripts/config/_colors.sh
source ./scripts/config/_icons.sh

CONTAINER_NAME=peer0.manufacturer.example.com

CC_LABEL=example.1.0-1.0

BASE_PATH=/etc/hyperledger/fabric
CHAINCODE_PATH=$BASE_PATH/chaincode
CC_PACKAGE_FILE=$CC_LABEL.tar.gz
SMART_CONTRACT=example.go

echo -e "${PROCESSING_ICON} Installing dependencies."
COMMAND="cd $CHAINCODE_PATH && go mod tidy"
docker exec -it $CONTAINER_NAME bash -c "$COMMAND"
echo -e "${SUCCESS_ICON} Dependencies installed."

echo -e "${PROCESSING_ICON} Packaging."
COMMAND="cd $CHAINCODE_PATH && peer lifecycle chaincode package $CC_PACKAGE_FILE -p $SMART_CONTRACT --label $CC_LABEL"

docker exec -it $CONTAINER_NAME bash -c "$COMMAND"
echo -e "${SUCCESS_ICON} Packaged."

echo -e "${SUCCESS_ICON} Finished succesfully."
exit 0