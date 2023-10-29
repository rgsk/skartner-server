# Get the directory of the current script
dir="$(dirname "$0")"

# Run the second script using its relative path from the current script's directory
sh "$dir/remove-redis.sh"

docker volume create skartner-server-redis-data

docker run \
  -p 6379:6379 \
  --name skartner-server-redis \
  -v skartner-server-redis-data:/data \
  -d \
  redis:latest