source ./scripts/config/_icons.sh

echo -e "${RED_FLAG} Generating Crypto Materials."
./scripts/hyperledger-fabric/1_generate_crypto_materials.sh

echo -e "\n${RED_FLAG} Generating Genesis Block."
./scripts/hyperledger-fabric/2_generate_genesis_block.sh

echo -e "\n${RED_FLAG} Generating Channel."
./scripts/hyperledger-fabric/3_generate_channel.sh

echo -e "\n${RED_FLAG} Generating Anchor Peers."
./scripts/hyperledger-fabric/4_generate_anchor_peers_update.sh
