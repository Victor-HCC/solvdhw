import { Pool } from "pg";
import 'dotenv/config'

const { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, HOST } = process.env

if (!DB_USER || !DB_HOST || !DB_NAME || !DB_PASSWORD || !DB_PORT) {
  throw new Error('Missing required environment variables for database connection');
}

const port = parseInt(DB_PORT, 10)

const pool = new Pool({
  user: DB_USER,
  host: HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port
})

export default pool