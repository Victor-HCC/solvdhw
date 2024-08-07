const bcrypt = require('bcryptjs')
const pool = require('../db')
require("dotenv").config();

const { ADMIN_USER, ADMIN_PASSWORD } = process.env

const createAdminUser = async () => {
  try {
    const username = ADMIN_USER
    const password = ADMIN_PASSWORD

    // Check if the admin already exists
    const check = await pool.query(`
      SELECT * FROM users WHERE username = $1
    `, [username]);

    if(check.rows.length > 0) {
      console.log('Admin already exists');
      return; 
    }

    const hashedPassword = await bcrypt.hash(password, 10)
  
    await pool.query(`
      INSERT INTO users (username, password, role)
      VALUES ($1, $2, $3)
      RETURNING id, username, role;`,
      [username, hashedPassword, 'admin']
    )
  
    console.log('Admin user created');
  } catch (error) {
    console.error('Error creating admin user', error.message)
  }
}

module.exports = createAdminUser