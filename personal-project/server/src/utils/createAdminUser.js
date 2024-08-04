const bcrypt = require('bcryptjs')
const pool = require('../db')

const createAdminUser = async () => {
  try {
    const username = 'admin@email.com'
    const password = '123abc'

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