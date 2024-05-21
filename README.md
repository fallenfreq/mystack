The server module needs to be published so this can be used by other people and the docker build context can stay at the root of the monorepo.

Tech Stack Monorepo using Typescript, Vue3, Vite, Zitadel, tRPC, Drizzle, docker, nginx

"privekey.pem" and "fullchain.pem" certs need to exsist in "./certs". For development, you can generate a certificate authority and self signed certificates using the scripts in the "./certs" directory.

"docker compose up" will start Zitadel, the necessary databases and the api - which also serves the vue 3 client. Docker is intended as an option for deployment for the api and sits behind nginx as a reverse proxy; Zitadel is always started as a container and has its own network, nginx, databases etc.

run "pnpm docker:up:zitadel" to start zitadel on it's own
run "db:api" to start a devlopment database for the api

run "pnpm build" to build the api and the client
run "pnpm dev" to start the api and a vite dev server of the Vue 3 clinet

Zitadel is at port 4443
Vite dev server is at 5173
The api is at 443 (default https)

Prefix with "/trpc" for the trpc endpoints
unprefixed will serve the client and client assets
