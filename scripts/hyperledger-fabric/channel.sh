#!/bin/bash
source ./scripts/config/_colors.sh
source ./scripts/config/_icons.sh
source ./scripts/hyperledger-fabric/_utils.sh

DOCKER_COMPOSE_FILE=./.docker/hyperledger-fabric-network.yml

CONTAINERS="peer0.org1.example.com peer0.org2.example.com peer0.org3.example.com"

ORDERER_HOST=orderer.example.com:7050

GENESIS_BLOCK=/etc/hyperledger/fabric/genesis.block

CHANNEL=examplechannel

for container in $CONTAINERS; do
    echo -e "${PROCESSING_ICON} Joining peer to the channel: ${container}."

    result=$(docker exec -it $container bash -c "peer channel list")

    if [[ "$result" == *"$CHANNEL"* ]]; then
        echo -e "${SUCCESS_ICON} Peer has already joined the channel. No action needed."
    else
        COMMAND="peer channel join -o $ORDERER_HOST -b $GENESIS_BLOCK"
        echo $COMMAND
        docker exec -it $container bash -c "$COMMAND"
        echo -e "${SUCCESS_ICON} Peer Joined."
    fi
done

echo -e "${SUCCESS_ICON} Finished succesfully."
exit 0