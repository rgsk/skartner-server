#!/bin/bash


docker rm -f skartner-server-local || true

docker run \
	--rm \
	-p 5433:5432 \
	--name skartner-server-local \
	-e POSTGRES_PASSWORD=postgres \
	-e POSTGRES_USER=postgres \
	-e POSTGRES_DB=postgres \
	-d postgres:14
