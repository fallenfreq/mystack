Tech Stack Monorepo using Typescript, Vue3, VueStic, Primevue unstyled with Tailwind, Vite, Zitadel, tRPC, Drizzle, docker, nginx

The layout is all over the place right now as I transition to using Primevue with Tailwind

"privekey.pem" and "fullchain.pem" certs need to exsist in "./certs". For development, you can generate a certificate authority and self signed certificates using the scripts in the "./certs" directory.

Create a copy of any ".example" files and fill them in with the ".exmaple" extention removed. ".env.example" becomes ".env"

"docker compose up" will start Zitadel, the necessary databases and the api - which also serves the vue 3 client. Docker is intended as an option for deployment for the api and sits behind nginx as a reverse proxy; Zitadel is always started as a container and has its own network, nginx, databases etc.

Prefix with "/trpc" for the trpc endpoints
unprefixed will serve the client and client assets

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

The framework currently has Vuestic and Primevue intergated

Cant use this until v4 supports tailwind presets since we are using the unstyled Primevue components with a Tailwind pass through object
https://github.com/primefaces/tailwindcss-primeui
https://primevue.org/tailwind/

Tailwind with Vuestic
Read more here - https://ui.vuestic.dev/styles/tailwind

npx sync-tailwind-with-vuestic - formats and transfers the color and breakpoints settings from the tailwind.config.\* file (and in its absence, it uses the default Tailwind CSS configuration) to the root file vuestic.config.js (also added by this command);

npx watch-tailwind - watches tailwind.config.\* in background and synchronizes the Vuestic UI configuration on the fly;

npx sync-vuestic-with-tailwind - transfers color and breakpoint settings from default Vuestic UI config to the Tailwind's configuration file (tailwind.config.cjs).
