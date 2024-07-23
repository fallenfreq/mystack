# Tech Stack Monorepo

## Overview

This repository is a monorepo for a web application using a modern tech stack. It includes:

- **TypeScript**
- **Vue 3**
- **Vuestic UI**
- **PrimeVue (unstyled with Tailwind)**
- **Tailwind CSS**
- **Vite**
- **Zitadel**
- **tRPC**
- **Drizzle ORM**
- **Docker**
- **Nginx**

## Setup

### Certificates

Ensure that `privkey.pem` and `fullchain.pem` certificates exist in the `./certs` directory. For development purposes, you can generate a certificate authority and self-signed certificates using the scripts provided in the `./certs` directory.

### Environment Variables

Create a copy of any `.example` files and fill them in, removing the `.example` extension. For example, `.env.example` becomes `.env`.

### Docker

Run `docker-compose up` to start Zitadel, the necessary databases, and the API, which also serves the Vue 3 client. Docker is intended as an option for deploying the API and sits behind Nginx as a reverse proxy. Zitadel is always started as a container and has its own network, including Nginx, databases, etc. Zitadel needs to be running for the login button to work.

### tRPC Endpoints

Prefix the tRPC endpoints with `/trpc`. Unprefixed URLs will serve the client and client assets.

#### Example tRPC Endpoint:

[https://localhost/trpc/echo?batch=1&input=%7B%220%22%3A%7B%22json%22%3A%7B%22name%22%3A%22from%20tRPC%22%7D%7D%7D](https://localhost/trpc/echo?batch=1&input=%7B%220%22%3A%7B%22json%22%3A%7B%22name%22%3A%22from%20tRPC%22%7D%7D%7D)

#### Example Vue Route:

[https://localhost/vuestic-demo](https://localhost/vuestic-demo)

## Development Commands

- **Start Zitadel:** `pnpm docker:up:zitadel`
- **Start Development Database:** `pnpm db:api`
- **Install Dependencies:** `pnpm install --shamefully-hoist`
- **Build API and Client:** `pnpm build`
- **Start API and Vite Dev Server:** `pnpm dev`

### Ports

- Zitadel: `https://localhost:4443`
- Vite Dev Server: `http://localhost:5173`

## Integration Details

The framework currently integrates Vuestic and PrimeVue.

### Tailwind and PrimeVue

PrimeVue components are unstyled and used with Tailwind. We cannot use `tailwindcss-primeui` until PrimeVue v4 supports Tailwind presets.

- [Tailwind CSS PrimeUI](https://github.com/primefaces/tailwindcss-primeui)
- [PrimeVue Tailwind](https://primevue.org/tailwind/)

### Tailwind and Vuestic

Read more about integrating Tailwind with Vuestic [here](https://ui.vuestic.dev/styles/tailwind).

The `client/cssVariables.js` file is generated by `client/plugins/extractCssVars.ts` so that variables can be accessed and passed to the `vuestic.config.js` to avoid duplicating color definitions. The commands below might override the `vuestic.config.js` file, which should be avoided.

#### Synchronization Commands:

- **Sync Tailwind with Vuestic:** `npx sync-tailwind-with-vuestic`

  - Formats and transfers the color and breakpoint settings from `tailwind.config.*` to `vuestic.config.js`.

- **Watch Tailwind Config:** `npx watch-tailwind`

  - Watches `tailwind.config.*` in the background and synchronizes the Vuestic UI configuration on the fly.

- **Sync Vuestic with Tailwind:** `npx sync-vuestic-with-tailwind`
  - Transfers color and breakpoint settings from the default Vuestic UI config to the Tailwind configuration file (`tailwind.config.cjs`).

## Contributions

We welcome contributions! Please feel free to fork this repository and submit pull requests. Make sure to follow the established coding standards and conventions.
