import { TRPCError, initTRPC } from '@trpc/server'
import type { CreateMyServerContextOptions } from './trpcAdapter.js'
import superjson from 'superjson'
import axios from 'axios'
import { envVars } from './config.js'
import https from 'https'
import fs from 'fs'

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

const secure = t.middleware(async ({ next, ctx }) => {
  const authHeader = ctx.req.headers.authorization
  if (!authHeader) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'No authorization header provided'
    })
  }

  const token = authHeader.split(' ')[1]
  try {
    const response = await axios.post(envVars.ZITADEL_INTROSPECTION_ENDPOINT, `token=${token}`, {
      ...(envVars.CA_PATH
        ? {
            httpsAgent: new https.Agent({
              ca: fs.readFileSync(envVars.CA_PATH)
            })
          }
        : {}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: envVars.ZITADEL_CLIENT_ID,
        password: envVars.ZITADEL_CLIENT_SECRET
      }
    })

    if (!response.data.active) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Inactive token'
      })
    }
    return next({ ctx: { secure: true } })
  } catch (error: any) {
    const message = error.response ? error.response.data : error.message
    console.error('Introspection error:', message)

    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: `Failed to introspect token: ${message}`
    })
  }
})

const router = t.router
const publicProcedure = t.procedure
const secureProcedure = t.procedure.use(secure)

export { router, publicProcedure, secureProcedure, createContext }
