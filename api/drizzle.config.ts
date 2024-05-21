import 'dotenv/config'
import type { Config } from 'drizzle-kit'

// @ts-ignore allowImportingTsExtensions
import { envVars } from './src/config/config.ts'

export default {
  schema: './src/schemas/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    host: envVars.HOST,
    port: Number(envVars.DB_PORT),
    user: envVars.DB_USER,
    password: envVars.DB_PASSWORD,
    database: envVars.DB_NAME
  }
} satisfies Config
