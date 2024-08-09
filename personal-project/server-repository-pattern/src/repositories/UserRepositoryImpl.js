const pool = require("../db");
const UserRepository = require("./UserRepository");
const bcrypt = require('bcryptjs')

class UserRepositoryImpl extends UserRepository {
  async create(user) {
    const hashedPassword = await bcrypt.hash(user.password, 10)

    const result = await pool.query(
      `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
      [user.username, hashedPassword]
    )

    return result.rows[0]
  }
  
  async findById(id) {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])

    if(result.rows.length === 0) return null

    return result.rows[0]
  }
  
  async findByUsername(username) {
    const result = await pool.query(`SELECT * FROM users WHERE username = $1 AND active = true`, [username])

    if(result.rows.length === 0) return null

    return result.rows[0]
  }

  async softDeleteById(id) {
    const result = await pool.query(
      `UPDATE users SET active = false WHERE id = $1`, [id]
    )

    return result.rowCount > 0 // Return true if the user was successfully deactivated
  }
  
}

module.exports = UserRepositoryImpl