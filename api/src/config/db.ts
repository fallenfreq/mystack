import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { envVars } from './config.js'
import * as schema from '../schemas/schema.js'

const uri = `postgres://${envVars.DB_USER}:${envVars.DB_PASSWORD}@${envVars.HOST}:${envVars.DB_PORT}/${envVars.DB_NAME}`
console.log('Connecting to', { uri })

// for query purposes
const client = postgres(uri)
const db = drizzle(client, { schema })

export { db }
