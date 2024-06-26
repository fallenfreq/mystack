import { createMyServerMiddleware } from './config/trpcAdapter.js'
import { appRouter } from './routes/appRouter.js'
import { createContext } from './config/trpc.js'
import { envVars } from './config/config.js'

import cors from 'cors'
import queuetie from 'queuetie'

import * as fs from 'fs'

import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = queuetie({
  httpsRedirect: true,
  httpPort: Number(envVars.HTTP_DEV_PORT),
  httpsRedirectPort: Number(envVars.INTERNAL_PORT),
  httpsOptions: {
    cert: fs.readFileSync(path.join(__dirname, '../../../certs/fullchain.pem')),
    key: fs.readFileSync(path.join(__dirname, '../../../certs/privkey.pem'))
  }
})

app.use(app.parseBody)

const { HOST, CLIENT_PORT } = envVars
app.use(
  'trpc',
  createMyServerMiddleware({
    onError: ({ error }) => {
      // Change error to hide deatils from the client and log if required
      if (error.code == 'INTERNAL_SERVER_ERROR') {
        // Can log errors from here
        console.log({
          name: error.name,
          code: error.code,
          message: error.message
        })
        // Change error
        error.stack = ''
        error.message = 'Server error'
      }
      // throw Error('Will crash if thrown here')
    },
    middleware: (req, res, next) => {
      cors({
        origin: new RegExp(`^https?://([^/]+\\.)?${HOST}:${CLIENT_PORT}$`, 'i'),
        optionsSuccessStatus: 200 // 204
      })(req, res, next)
    },
    router: appRouter,
    createContext
  })
)

app.use(
  app.static({
    staticDir: '../client/dist'
  }),
  app.static({
    staticDir: '../client/dist',
    filePath: '/index.html'
  })
)

try {
  await app.listenAsync(process.env.INTERNAL_PORT)
  const address = app.address()
  if (address && typeof address !== 'string') console.log(`Listening on port ${address.port}`)
} catch (err) {
  app.emit('error', { exit: true })
}
