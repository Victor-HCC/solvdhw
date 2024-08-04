const pool = require("../db");

class LeaveBalance {
  constructor(id, employeeId, leaveTypeId, balance) {
    this.id = id
    this.employeeId = employeeId
    this.leaveTypeId = leaveTypeId
    this.balance = balance
  }

  static async create({ employeeId, leaveTypeId, balance }) {
    const result = await pool.query(`
      INSERT INTO leave_balances (employee_id, leave_type_id, balance)
      VALUES ($1, $2, $3) RETURNING *
      `, [employeeId, leaveTypeId, balance]
    )

    return new LeaveBalance(result.rows[0].id, result.rows[0].employee_id, result.rows[0].leave_type_id, result.rows[0].balance)
  }

  // static async findByEmployeeId(employeeId) {
  //   const result = await pool.query(
  //     `SELECT * FROM leave_balances WHERE employee_id = $1`,
  //     [employeeId]
  //   )

  //   return result.rows.map(row => new LeaveBalance(row.id, row.employee_id, row.leave_type_id, row.balance))
  // }

  static async findByEmployeeId(employeeId) {
    const result = await pool.query(
      `SELECT lb.id, lb.employee_id, lb.leave_type_id, lt.name AS name_leave_type, lb.balance
      FROM leave_balances lb
      JOIN leave_types lt ON lb.leave_type_id = lt.id
      WHERE lb.employee_id = $1`,
      [employeeId]
    )

    return result.rows.map(row => ({
      id: row.id, 
      employeeId: row.employee_id, 
      leaveTypeId: row.leave_type_id, 
      nameLeaveType: row.name_leave_type,
      balance: row.balance
    }))
  }

  static async findByEmployeeIdAndLeaveTypeId(employeeId, leaveTypeId) {
    const result = await pool.query(
      `SELECT * FROM leave_balances WHERE employee_id = $1 AND leave_type_id = $2`,
      [employeeId, leaveTypeId]
    )

    if(result.rows.length === 0) return null

    return new LeaveBalance(result.rows[0].id, result.rows[0].employee_id, result.rows[0].leave_type_id, result.rows[0].balance)
  }

  // static async updateBalance(employeeId, leaveTypeId, newBalance) {
  //   const result = await pool.query(
  //     `UPDATE leave_balances SET balance = $3 WHERE employee_id = $1 AND leave_type_id = $2 RETURNING *`,
  //     [employeeId, leaveTypeId, newBalance]
  //   )

  //   return new LeaveBalance(result.rows[0].id, result.rows[0].employee_id, result.rows[0].leave_type_id, result.rows[0].balance)
  // }

  static async decreaseLeaveBalance(employeeId, leaveTypeId, days) {
    await pool.query(
      `SELECT * FROM decrease_leave_balance($1, $2, $3)`,
      [employeeId, leaveTypeId, days]
    )
  }

  static async deleteByEmployeeId(employeeId) {
    const result = await pool.query(
      `DELETE FROM leave_balances WHERE employee_id = $1 RETURNING *`,
      [employeeId]
    )

    return result.rowCount > 0
  }

}

module.exports = LeaveBalance