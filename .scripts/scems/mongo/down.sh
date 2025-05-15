#!/bin/bash
VOLUME=scems_mongo_volume

docker volume rm $VOLUME 2>/dev/null

cd ./.docker/scems && docker compose -f network.yml -f mongo.yml down
