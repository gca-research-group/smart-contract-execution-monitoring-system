#!/bin/bash
echo -e "========= Clean ========="
./scripts/hyperledger-fabric/artifacts/clean.sh

echo -e "\n========= Crypto Materials ========="
./scripts/hyperledger-fabric/artifacts/cryptomaterials.sh

echo -e "\n========= Genesis Block ========="
./scripts/hyperledger-fabric/artifacts/genesisblock.sh

echo -e "\n========= Channel ========="
./scripts/hyperledger-fabric/artifacts/channel.sh
