#!/bin/bash
DIRECTORY=./.docker/scems/volumes/postgres/data

if [[ ! -d "$DIRECTORY" ]]; then
  mkdir -p "$DIRECTORY"
fi

cd ./.docker/scems && docker compose -f network.yml -f postgres.yml up --build -d
