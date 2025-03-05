#!/bin/bash
cd ./.docker && docker compose -f config.yml -f api-database.yml down