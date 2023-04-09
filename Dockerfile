FROM node:16.14.0-slim

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY ./package*.json ./
COPY ./yarn.lock ./


RUN yarn

COPY ./ ./

RUN yarn init:prisma
RUN yarn build

ARG LOCAL_IP
ENV LOCAL_IP=${LOCAL_IP:?error}

CMD ["yarn", "start"]

