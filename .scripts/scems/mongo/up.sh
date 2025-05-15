#!/bin/bash
DIRECTORY=./.docker/scems/volumes/mongo/data

if [[ ! -d "$DIRECTORY" ]]; then
  mkdir -p "$DIRECTORY"
fi

cd ./.docker/scems && docker compose -f network.yml -f mongo.yml up --build -d
