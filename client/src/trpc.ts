import { httpBatchLink, createTRPCClient } from '@trpc/client'
// to remove error A type annotation is necessary.ts(2742)
import '@trpc/server'

import type { AppRouter } from '@vue-app/api/appRouter'
import superjson from 'superjson'

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      transformer: superjson,
      url: `http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_INTERNAL_PORT}/trpc`
    })
  ]
})

export { trpc }
