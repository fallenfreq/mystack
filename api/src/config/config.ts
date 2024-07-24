import { z } from 'zod'

const envVars = z
  .object({
    HOST: z.string(),
    HTTP_DEV_PORT: z.string(),
    CLIENT_PORT: z.string(),
    INTERNAL_PORT: z.string(),
    DB_USER: z.string(),
    DB_NAME: z.string(),
    DB_PASSWORD: z.string(),
    DB_PORT: z.string(),
    ZITADEL_CLIENT_ID: z.string(),
    ZITADEL_CLIENT_SECRET: z.string(),
    ZITADEL_INTROSPECTION_ENDPOINT: z.string()
  })
  .parse(process.env)

export { envVars }
