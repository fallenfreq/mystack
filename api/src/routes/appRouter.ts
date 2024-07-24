import { publicProcedure, router } from '../config/trpc.js'
import { z } from 'zod'
import { secureRouter } from './secure/router.js'
import { userRouter } from './user/router.js'

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
