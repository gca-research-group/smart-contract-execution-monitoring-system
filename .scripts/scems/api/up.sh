#!/bin/bash
POSTGRES_DATA_PATH=./.docker/scems/volumes/postgres/data

if [[ ! -d "$POSTGRES_DATA_PATH" ]]; then
  mkdir -p "$POSTGRES_DATA_PATH"
fi

cd ./.docker/scems && docker compose -f docker-compose.yml up --build -d
