const pool = require('../db')
const bcrypt = require('bcryptjs')

class User {
  constructor(id, username, password, role) {
    this.id = id
    this.username = username
    this.password = password
    this.role = role
  }

  static async create({ username, password }) {
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await pool.query(
      `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
      [username, hashedPassword]
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

  async isPasswordCorrect(password) {
    return await bcrypt.compare(password, this.password)
  }
}

module.exports = User