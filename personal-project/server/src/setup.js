const pool = require('./db')

const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
      );
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS employees (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        position VARCHAR(255),
        annual_leave_days FLOAT,
        sick_leave_days FLOAT,
        unpaid_leave_days FLOAT,
        user_id INTEGER REFERENCES users(id)
      );
    `)

    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables', error)
  } /*finally {
    pool.end()
  }*/
}

module.exports = createTables