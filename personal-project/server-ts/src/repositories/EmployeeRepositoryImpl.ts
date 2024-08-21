import EmployeeRepository from "./EmployeeRepository";
import { AllEmployees, Employee, EmployeeInput, UpdateFields } from "../types/types";
import { cleanEmployeeData } from "../utils/cleanData";
import pool from "../db";

class EmployeeRepositoryImpl extends EmployeeRepository {
  async create(employee: EmployeeInput): Promise<Employee> {
    const result = await pool.query(
      `INSERT INTO employees (name, email, department_id, user_id, hire_date)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [employee.name, employee.email, employee.departmentId, employee.userId, employee.hireDate]
    )

    return cleanEmployeeData(result.rows[0])
  }

  async findById(id: number): Promise<Employee | null> {
    const result = await pool.query(`SELECT * FROM employees WHERE id = $1`, [id])

    if(result.rows.length === 0) return null

    return cleanEmployeeData(result.rows[0])
  }

  async update(id: number, fields: UpdateFields): Promise<Employee | null> {
    const setString = Object.keys(fields)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ')

    const values = [id, ...Object.values(fields)]

    const result = await pool.query(
      `UPDATE employees SET ${setString} WHERE id = $1 RETURNING *`, values
    )

    if(result.rows.length === 0) return null

    return cleanEmployeeData(result.rows[0])
  }
  
  async getAll(): Promise<AllEmployees> {
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
    const employees = result.rows.map(cleanEmployeeData)

    return { employees, totalCount }
  }
  async findByUserId(userId: number): Promise<Employee | null> {
    const result = await pool.query(`SELECT * FROM employees WHERE user_id = $1`, [userId])

    if(result.rows.length === 0) return null

    return cleanEmployeeData(result.rows[0])
  }
  
}

export default EmployeeRepositoryImpl