FROM node:21-bookworm-slim

RUN apt-get update && apt-get install -y git

RUN npm --silent install --global --depth 0 pnpm

WORKDIR /home/node/listit-lol

USER 0

COPY ./docker/docker-entrypoint.sh /

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]