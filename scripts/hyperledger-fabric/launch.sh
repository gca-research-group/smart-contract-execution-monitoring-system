#!/bin/bash
source ./scripts/hyperledger-fabric/_utils.sh

echo -e "********** Containers **********"
verifyIfDockerIfRunning
./scripts/hyperledger-fabric/down.sh

echo -e "\n********** Artifacts **********\n"
./scripts/hyperledger-fabric/artifacts/launch.sh

echo -e "\n********** Network **********\n"
./scripts/hyperledger-fabric/up.sh
./scripts/hyperledger-fabric/channel.sh
