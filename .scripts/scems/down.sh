#!/bin/bash
VOLUME=scems_database_volume

docker volume rm $VOLUME 2>/dev/null
