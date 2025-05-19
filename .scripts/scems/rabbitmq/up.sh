#!/bin/bash
DIRECTORY=./.docker/scems/volumes/rabbitmq

if [[ ! -d "$DIRECTORY" ]]; then
  mkdir -p "$DIRECTORY"
fi

cd ./.docker/scems && docker compose -f network.yml -f rabbitmq.yml up --build -d
