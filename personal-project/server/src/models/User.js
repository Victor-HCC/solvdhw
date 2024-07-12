const pool = require('../db')
const bcrypt = require('bcryptjs')

class User {
  constructor(id, username, password, email) {
    this.id = id
    this.username = username
    this.password = password
    this.email = email
  }

  static async create({ username, password, email }) {
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await pool.query(
      `INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *`,
      [username, hashedPassword, email]
    )

    return new User(...Object.values(result.rows[0]))
  }

  static async findById(id) {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])

    if(result.rows.length === 0) return null

    return new User(...Object.values(result.rows[0]))
  }

  static async findByUsername(username) {
    const result = await pool.query(`SELECT * FROM users WHERE username = $1`, [username])

    if(result.rows.length === 0) return null

    return new User(...Object.values(result.rows[0]))
  }
}

module.exports = User