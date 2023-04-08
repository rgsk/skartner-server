#!/bin/bash


docker rm -f skartner-server-pg || true

docker run \
	--rm \
	-p 5432:5432 \
	--name skartner-server-pg \
	-e POSTGRES_PASSWORD=postgres \
	-e POSTGRES_USER=postgres \
	-e POSTGRES_DB=postgres \
	-d postgres:14
