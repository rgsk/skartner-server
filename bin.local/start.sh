sed -i '' 's/localhost/host.docker.internal/g' .env

docker run -d \
--env-file .env \
-p 8000:8000 \
-p 5555:5555 \
--name skartner-server \
rgskartner/skartner-server

sed -i '' 's/host.docker.internal/localhost/g' .env