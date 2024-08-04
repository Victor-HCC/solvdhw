const pool = require("../db");

class Employee {
  constructor(id, name, email, departmentId, userId, hireDate) {
    this.id = id
    this.name = name
    this.email = email
    this.departmentId = departmentId
    this.userId = userId
    this.hireDate = hireDate
  }

  static async create({ name, email, departmentId, userId, hireDate}) {
    const result = await pool.query(
      `INSERT INTO employees (name, email, department_id, user_id, hire_date)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, departmentId, userId, hireDate]
    )
    // console.log(result.rows[0]);

    return new Employee(result.rows[0].id, result.rows[0].name, result.rows[0].email, result.rows[0].department_id, result.rows[0].user_id, result.rows[0].hire_date)
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
    
    const row = result.rows[0]
    return new Employee(row.id, row.name, row.email, row.department_id, row.user_id, row.hire_date)
  }

  static async findByName(name) {
    const result = await pool.query(
      `SELECT * FROM employees WHERE name ILIKE $1`, 
      [`%${name}%`]
    )
  }

}

module.exports = Employee