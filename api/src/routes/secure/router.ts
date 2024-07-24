import { secureProcedure, router } from '../../config/trpc.js'
import { z } from 'zod'

const secureRouter = router({
  test: secureProcedure.input(z.string()).query(async (opt) => {
    console.log('opt.input:', opt.input)
    return { secure: opt.ctx.secure, input: opt.input }
  })
})

export { secureRouter }
