#!/bin/bash
source ./scripts/config/_colors.sh
source ./scripts/config/_icons.sh
source ./scripts/hyperledger-fabric/_variables.sh

echo -e "${PROCESSING_ICON} Initializing the network."
docker compose -f $HYPERLEDGER_FABRIC_NETWORK up --build -d > /dev/null 2>&1
echo -e "${SUCCESS_ICON} Network initialized."
exit 0
