import { secureProcedure, router } from '../../config/trpc.js'

const secureRouter = router({
  // https://localhost/trpc/secure.test
  test: secureProcedure.query(async (opt) => {
    console.log('opt.input:', opt.input)
    return opt.ctx.secure
  })
})

export { secureRouter }
