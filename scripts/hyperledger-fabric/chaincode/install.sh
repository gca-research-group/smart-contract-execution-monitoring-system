source ./scripts/config/_colors.sh
source ./scripts/config/_icons.sh

CONTAINER_NAME=peer0.manufacturer.supplychain.com

CC_LABEL=supplychain.1.0-1.0

BASE_PATH=/etc/hyperledger/fabric
CHAINCODE_PATH=$BASE_PATH/chaincode
CC_PACKAGE_FILE=$CC_LABEL.tar.gz

echo -e "${PROCESSING_ICON} Verifying if the chaincode is already installed."
COMMAND='peer lifecycle chaincode queryinstalled | grep "supplychain"'
result=(docker exec -it $CONTAINER_NAME bash -c "$COMMAND")

if [[ -n "$result" ]]; then
    echo -e "${SUCCESS_ICON} The chaincode is already installed." 
    echo -e "${SUCCESS_ICON} Finished succesfully."  
    exit 0
fi

echo -e "${PROCESSING_ICON} Installing."
COMMAND="cd $CHAINCODE_PATH && peer lifecycle chaincode install $CC_PACKAGE_FILE"
docker exec -it $CONTAINER_NAME bash -c "$COMMAND"
echo -e "${SUCCESS_ICON} Installed."

echo -e "${SUCCESS_ICON} Finished succesfully."
exit 0