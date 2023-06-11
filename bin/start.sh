#!/bin/bash

dir="$(dirname "$0")"

sh "$dir/restart-postgres.sh"
sh "$dir/restart-redis.sh"

yarn studio &

yarn dev