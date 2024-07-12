const pool = require("../db");

class Employee {
  constructor(id, name, email, position, annualLeaveDays, sickLeaveDays, unpaidLeaveDays, userId) {
    this.id = id
    this.name = name
    this.email = email
    this.position = position
    this.annualLeaveDays = annualLeaveDays
    this.sickLeaveDays = sickLeaveDays
    this.unpaidLeaveDays = unpaidLeaveDays
    this.userId = userId
  }

  static async create({ name, email, position, annualLeaveDays, sickLeaveDays, unpaidLeaveDays, userId }) {
    const result = await pool.query(
      `INSERT INTO employees (name, email, position, annual_leave_days, sick_leave_days, unpaid_leave_days, user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, email, position, annualLeaveDays, sickLeaveDays, unpaidLeaveDays, userId]
    )

    return new Employee(...Object.values(result.rows[0]))
  }

  static async findById(id) {
    const result = await pool.query(`SELECT * FROM employees WHERE id = $1`, [id])

    if(result.rows[0].length === 0) return null

    return new Employee(...Object.values(result.rows[0]))
  }

  static async update(id, fields) {
    const setString = Object.keys(fields)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ')

    const values = [id, ...Object.values(fields)]

    const result = await pool.query(
      `UPDATE employees SET ${setString} WHERE id = $1 RETURNING *`,
      values
    )

    return new Employee(...Object.values(result.rows[0]))
  }

  static async delete(id) {
    const result = await pool.query(`DELETE FROM employees WHERE id = $1 RETURNING *`, [id])

    return result.rowCount > 0
  }

  static async getAll() {
    const result = await pool.query(`SELECT * FROM employees`)

    return result.rows.map(row => new Employee(...Object.values(row)))
  }

  static async findByUserId(userId) {
    const result = await pool.query(`SELECT * FROM employees WHERE user_id = $1`, [userId])

    if(result.rows.length === 0) return null

    return new Employee(...Object.values(result.rows[0]))
  }

}

module.exports = Employee