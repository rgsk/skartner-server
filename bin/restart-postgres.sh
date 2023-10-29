#!/bin/bash

# Get the directory of the current script
dir="$(dirname "$0")"

# Run the second script using its relative path from the current script's directory
sh "$dir/remove-postgres.sh"

docker volume create skartner-server-postgres-pgdata

docker run \
	-p 5433:5432 \
	--name skartner-server-local \
	-e POSTGRES_PASSWORD=postgres \
	-e POSTGRES_USER=postgres \
	-e POSTGRES_DB=postgres \
	-v skartner-server-postgres-pgdata:/var/lib/postgresql/data \
	-d postgres:14
