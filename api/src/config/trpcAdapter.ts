import type { AnyTRPCRouter } from '@trpc/server'

import {
  type NodeHTTPCreateContextFnOptions,
  type NodeHTTPHandlerOptions,
  type NodeHTTPRequestHandlerOptions,
  nodeHTTPRequestHandler
} from '@trpc/server/adapters/node-http'

import type { AugmentedRequest, AugmentedResponse, MiddlewareCall } from 'queuetie'

type CreateMyServerContextOptions = NodeHTTPCreateContextFnOptions<
  AugmentedRequest,
  AugmentedResponse
>

const createMyServerMiddleware = <TRouter extends AnyTRPCRouter>(
  opts: NodeHTTPHandlerOptions<TRouter, AugmentedRequest, AugmentedResponse>
): MiddlewareCall =>
  async function (req, res) {
    const mergedOpts: NodeHTTPRequestHandlerOptions<TRouter, AugmentedRequest, AugmentedResponse> =
      {
        req,
        res,
        path: req.pathname.slice(this.segments.join('').length + this.segments.length + 1),
        ...opts
      }
    // The problem is undefined might have been passed in and undefined can not be passed if
    // "exactOptionalPropertyTypes": true
    if (opts.middleware) mergedOpts.middleware = opts.middleware
    if (opts.createContext) mergedOpts.createContext = opts.createContext
    await nodeHTTPRequestHandler(mergedOpts)
  }

export { createMyServerMiddleware, type CreateMyServerContextOptions }
