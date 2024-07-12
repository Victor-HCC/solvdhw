const { Pool } = require('pg')
require("dotenv").config();

const { DB_USER, HOST, DB_NAME, PASSWORD, DB_PORT } = process.env

const pool = new Pool({
  user: DB_USER,
  host: HOST,
  database: DB_NAME,
  password: PASSWORD,
  port: DB_PORT
})

module.exports = pool