import { TRPCError, initTRPC } from '@trpc/server'
import type { CreateMyServerContextOptions } from './trpcAdapter.js'
import superjson from 'superjson'

const createContext: (
  opts: CreateMyServerContextOptions
) => Promise<CreateMyServerContextOptions> = async ({ req, res, info }) => {
  return {
    req,
    res,
    info
  }
}

type Context = Awaited<ReturnType<typeof createContext>>

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create({
  transformer: superjson
})

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */

const secure = t.middleware(({ next, ctx }) => {
  if (ctx.req.method == 'PUT') {
    throw new TRPCError({
      code: 'UNAUTHORIZED'
    })
  }

  return next({
    ctx: {
      // update or add ctx props
      secure: true
    }
  })
})

const router = t.router
const publicProcedure = t.procedure
const secureProcedure = t.procedure.use(secure)

export { router, publicProcedure, secureProcedure, createContext }
