#!/bin/bash

# Get the directory of the current script
dir="$(dirname "$0")"

# Run the second script using its relative path from the current script's directory
sh "$dir/remove-postgres.sh"

docker volume create skartner-server-postgres-data

docker run \
	-p 5432:5432 \
	--name skartner-server-postgres \
	-e POSTGRES_PASSWORD=postgres \
	-e POSTGRES_USER=postgres \
	-e POSTGRES_DB=postgres \
	-v skartner-server-postgres-data:/var/lib/postgresql/data \
	-d postgres:14
