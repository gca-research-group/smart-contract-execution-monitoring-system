#!/bin/bash
source ./scripts/config/_colors.sh
source ./scripts/config/_icons.sh
source ./scripts/hyperledger-fabric/_utils.sh
source ./scripts/hyperledger-fabric/_variables.sh

verifyIfDockerIfRunning

echo -e "${PROCESSING_ICON} Removing containers."

docker compose -f $HYPERLEDGER_FABRIC_TOOLS down
docker compose -f $HYPERLEDGER_FABRIC_NETWORK down

echo -e "${SUCCESS_ICON} Finished succesfully."
exit 0
