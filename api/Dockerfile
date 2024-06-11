# need to install shared modules
FROM node:latest

# the dir inside the container
# paths on right are relative to this WORKDIR
WORKDIR /api 

COPY ./api/package*.json ./
COPY ./package*.json ../

COPY ./certs ../certs

RUN corepack enable

RUN pnpm install --production
RUN pnpm install --production -C ../

COPY ./api/src ./src
COPY ./api/dist ./dist

COPY ./client/dist ../client/dist

CMD ["pnpm", "start"]