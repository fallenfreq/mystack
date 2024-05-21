// This file is run via scripts in the package.json

import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import { envVars } from './config.js'

const uri = `postgres://${envVars.DB_USER}:${envVars.DB_PASSWORD}@${envVars.HOST}:${envVars.DB_PORT}/${envVars.DB_NAME}`
console.log({ uri })

// for migrations ( using a single connection for this as advised )
const migrationClient = postgres(uri, { max: 1 })

console.log('Migrate starting...')

try {
  await migrate(drizzle(migrationClient), { migrationsFolder: './drizzle' })
  console.log('Migrate compleated...')
  await migrationClient.end()
  process.exit(0)
} catch (err) {
  console.log('Error:', err)
  await migrationClient.end()
  process.exit(1)
}
