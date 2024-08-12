const EmployeeRepository = require("./EmployeeRepository");
const pool = require('../db');
const { cleanEmployeeData } = require("../utils/dataCleaners");

class EmployeeRepositoryImpl extends EmployeeRepository {
  async create(employee) {
    const result = await pool.query(
      `INSERT INTO employees (name, email, department_id, user_id, hire_date)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [employee.name, employee.email, employee.departmentId, employee.userId, employee.hireDate]
    )

    return cleanEmployeeData(result.rows[0])
  }

  async findById(id) {
    const result = await pool.query(`SELECT * FROM employees WHERE id = $1`, [id])
    
    return cleanEmployeeData(result.rows[0])
  }

  async update(id, fields) {
    const setString = Object.keys(fields)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ')
    
    const values = [id, ...Object.values(fields)]

    const result = await pool.query(
      `UPDATE employees SET ${setString} WHERE id = $1 RETURNING *`,
      values
    )

    return result.rows[0]
  }

  async delete(id) {
    const result = await pool.query(`DELETE FROM employees WHERE id = $1 RETURNING *`, [id])

    return result.rowCount > 0
  }

  async getAll() { // gets all active employees
    const result = await pool.query(
      `SELECT em.id, em.name, em.email, em.department_id, em.user_id, em.hire_date
      FROM employees em
      JOIN users ON users.id = em.user_id 
      WHERE users.active = true`
    )

    const totalCountResult = await pool.query(
      `SELECT COUNT(*) 
      FROM employees em
      JOIN users ON users.id = em.user_id
      WHERE users.active = true`
    )

    const totalCount = parseInt(totalCountResult.rows[0].count, 10)
    
    const employees =  result.rows.map(cleanEmployeeData)

    return { employees, totalCount }
  }


  async findByUserId(userId) {
    const result = await pool.query(`SELECT * FROM employees WHERE user_id = $1`, [userId])

    return cleanEmployeeData(result.rows[0])
  }
}

module.exports = EmployeeRepositoryImpl