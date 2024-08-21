// jest-global-setup.js
require('dotenv').config({ path: '.env.test' });
const dbSetup = require('./src/setup').default
const { Pool } = require('pg');

module.exports = async () => {
  console.log('Setting up before running tests...');

  // Initialize database connection
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  });

  // Ensure the database is ready
  await pool.query('SELECT 1');
  await pool.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;'); //Reset the Database Before Tests
  await dbSetup()

  console.log('Database connection established.');
  
  // Close the pool (to avoid warnings)
  await pool.end();
};
