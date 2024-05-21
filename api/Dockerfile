# need to install shared modules
FROM node:latest

# the dir inside the container
# paths on right are relative to this WORKDIR
WORKDIR /vue-app/api 

COPY ./localmods/server ../../localmods/server
COPY ./localmods/fileCache ../../localmods/fileCache
COPY ./localmods/myUtils ../../localmods/myUtils

COPY ./vue-app/api/package*.json ./
COPY ./vue-app/package*.json ../

COPY ./vue-app/certs .../certs

RUN corepack enable

RUN pnpm install --production
RUN pnpm install --production -C ../

COPY ./vue-app/api/src ./src
COPY ./vue-app/api/dist ./dist

COPY ./vue-app/client/dist ../client/dist

CMD ["pnpm", "start"]