DOCKER_COMPOSE_FILE=./.docker/hyperledger-fabric-binaries.yml

if [[ "$1" == "stop" ]]; then
    docker-compose -f $DOCKER_COMPOSE_FILE down
else
    docker-compose -f $DOCKER_COMPOSE_FILE up --build -d
fi