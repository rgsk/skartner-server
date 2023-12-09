FROM node:18.19-slim

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY ./package*.json ./
COPY ./yarn.lock ./


RUN yarn

COPY ./ ./

ARG LOCAL_IP
ENV LOCAL_IP=${LOCAL_IP}

RUN yarn init:prisma

CMD ["sh", "./bin/start.sh"]
