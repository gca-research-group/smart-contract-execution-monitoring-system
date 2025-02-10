#!/bin/bash
VOLUME=monitoring_system_api_database_volume

errors=$(docker volume rm $VOLUME 2>&1)

if [ -n "$errors" ] && [ "$errors" != "$VOLUME" ]; then
    echo "The volume $VOLUME was not found. Skipping the exclusion."
fi