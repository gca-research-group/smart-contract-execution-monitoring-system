#!/bin/bash
VOLUME=scems_postgres_volume

docker volume rm $VOLUME 2>/dev/null

cd ./.docker/scems && docker compose -f network.yml -f postgres.yml down
