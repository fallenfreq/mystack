import { publicProcedure, router } from '../config/trpc.js'
import { z } from 'zod'
import { secureRouter } from './secure/router.js'
import { userRouter } from './user/router.js'

// const encoded = `${encodeURIComponent(JSON.stringify({ 0: { json: { name: 'from tRPC' } } }))}`
// console.log(encoded)
// batch=1 for httpBatchLink
// https://localhost/trpc/echo?batch=1&input=%7B%220%22%3A%7B%22json%22%3A%7B%22name%22%3A%22from%20tRPC%22%7D%7D%7D
// [{"result":{"data":{"json":"Echo back: from tRPC"}}}]

const appRouter = router({
  secure: secureRouter,

  user: userRouter,

  test: publicProcedure.query(async () => {
    return 'Some stuff'
  }),

  echo: publicProcedure.input(z.object({ name: z.string() })).query(async (opts) => {
    return 'Echo back: ' + opts.input.name
  })
})

export { appRouter }
export type AppRouter = typeof appRouter
