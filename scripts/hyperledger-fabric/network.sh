source ./scripts/config/_colors.sh
source ./scripts/config/_icons.sh

DOCKER_COMPOSE_FILE=./.docker/hyperledger-fabric-network.yml
CONTAINER_NAME=peer0.manufacturer.supplychain.com

ORDERER_HOST=orderer.supplychain.com:7050
GENESIS_BLOCK=/etc/hyperledger/fabric/supplychain.block

CHANNEL=supplychainchannel

if [[ "$1" == "down" ]]; then
  docker-compose -f $DOCKER_COMPOSE_FILE down
  exit 0
fi

echo -e "${PROCESSING_ICON} Initializing the network."
resunt=$(docker-compose -f $DOCKER_COMPOSE_FILE up --build -d)
echo -e "${SUCCESS_ICON} Network initialized."

echo -e "${PROCESSING_ICON} Joining peer to the channel."

result=$(docker exec -it $CONTAINER_NAME bash -c "peer channel list")

if [[ "$result" == *"$CHANNEL"* ]]; then
  echo -e "${SUCCESS_ICON} Peer has already joined the channel. No action needed."
else
  docker exec -it $CONTAINER_NAME bash -c "peer channel join -o $ORDERER_HOST -b $GENESIS_BLOCK"
  echo -e "${SUCCESS_ICON} Peer Joined."
fi

echo -e "${SUCCESS_ICON} Finished succesfully."
exit 0