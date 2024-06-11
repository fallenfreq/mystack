The server module needs to be published so this can be used by other people and the docker build context can stay at the root of the monorepo.

Tech Stack Monorepo using Typescript, Vue3, Vite, Zitadel, tRPC, Drizzle, docker, nginx

"privekey.pem" and "fullchain.pem" certs need to exsist in "./certs". For development, you can generate a certificate authority and self signed certificates using the scripts in the "./certs" directory.

Create a copy of any ".example" files and fill them in with the ".exmaple" extention removed. ".env.example" becomes ".env"

"docker compose up" will start Zitadel, the necessary databases and the api - which also serves the vue 3 client. Docker is intended as an option for deployment for the api and sits behind nginx as a reverse proxy; Zitadel is always started as a container and has its own network, nginx, databases etc.

/trpc will access the trpc routes, all other routes will currently serve the vue 3 app.

tRPC example:
https://localhost/trpc/echo?batch=1&input=%7B%220%22%3A%7B%22json%22%3A%7B%22name%22%3A%22from%20tRPC%22%7D%7D%7D

Vue example:
https://localhost/about

run "pnpm docker:up:zitadel" to start zitadel on it's own
run "pnpm db:api" to start a devlopment database for the api. Docker needs to be installed locally for this

run "pnpm install --shamefully-hoist"
run "pnpm build" to build the api and the client
run "pnpm dev" to start the api and a vite dev server of the Vue 3 clinet

Zitadel is at port 4443
Vite dev server is at 5173

Prefix with "/trpc" for the trpc endpoints
unprefixed will serve the client and client assets
