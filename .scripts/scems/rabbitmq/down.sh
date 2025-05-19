#!/bin/bash
VOLUME=scems_rabbitmq_volume

docker volume rm $VOLUME 2>/dev/null

cd ./.docker/scems && docker compose -f network.yml -f rabbitmq.yml down
