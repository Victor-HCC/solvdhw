import bcrypt from 'bcryptjs'
import pool from '../db'
import 'dotenv/config'

const { ADMIN_USER, ADMIN_PASSWORD } = process.env

if(!ADMIN_USER || !ADMIN_PASSWORD) {
  throw new Error('Missing required environment variables: ADMIN_USER or ADMIN_PASSWORD');
}

const createAdminUser = async (): Promise<void> => {
  try {
    const username = ADMIN_USER
    const password = ADMIN_PASSWORD

    //Check if the admin already exists
    const check = await pool.query(
      `SELECT * FROM users WHERE username = $1`, [username]
    )

    if(check.rows.length > 0) {
      console.log('Admin already exists.');
      return;
    }

    const hashPassword = await bcrypt.hash(password, 10)

    await pool.query(`
      INSERT INTO users (username, password, role)  
      VALUES ($1, $2, $3)
      RETURNING id, username, role;
    `, [username, hashPassword, 'admin']
    )

    console.log('Admin user created.'); 
  } catch (error) {
    console.error('Error creating admin user.', (error as Error).message)
  }
}

export default createAdminUser;