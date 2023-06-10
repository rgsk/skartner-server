docker volume create skartner-server-redis-data

docker run \
  --rm \
  -p 6379:6379 \
  --name skartner-server-redis \
  -v skartner-server-redis-data:/data \
  -d \
  redis:latest