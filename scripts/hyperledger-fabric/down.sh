#!/bin/bash
source ./scripts/config/_colors.sh
source ./scripts/config/_icons.sh

echo -e "${PROCESSING_ICON} Removing containers."

HYPERLEDGER_FABRIC_TOOLS=./.docker/hyperledger-fabric-tools.yml
HYPERLEDGER_FABRIC_NETWORK=./.docker/hyperledger-fabric-network.yml

docker-compose -f $HYPERLEDGER_FABRIC_TOOLS down
docker-compose -f $HYPERLEDGER_FABRIC_NETWORK down

echo -e "${SUCCESS_ICON} Finished succesfully."
exit 0
