const LeaveBalanceRepository = require("./LeaveBalanceRepository");
const pool = require('../db')

class LeaveBalanceRepositoryImpl extends LeaveBalanceRepository {
  async create(leaveBalance) {
    const result = await pool.query(`
      INSERT INTO leave_balances (employee_id, leave_type_id, balance)
      VALUES ($1, $2, $3) RETURNING *
      `, [leaveBalance.employeeId, leaveBalance.leaveTypeId, leaveBalance.balance]
    )

    return result.rows[0]
  }

  async findByEmployeeId(employeeId) {
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

  async findByEmployeeIdAndLeaveTypeId(employeeId, leaveTypeId) {
    const result = await pool.query(
      `SELECT * FROM leave_balances WHERE employee_id = $1 AND leave_type_id = $2`,
      [employeeId, leaveTypeId]
    )

    if(result.rows.length === 0) return null

    return result.rows[0]
  }

  async decreaseLeaveBalance(employeeId, leaveTypeId, days) {
    await pool.query(
      `SELECT * FROM decrease_leave_balance($1, $2, $3)`,
      [employeeId, leaveTypeId, days]
    )
  }

  async deleteByEmployeeId(employeeId) {
    const result = await pool.query(
      `DELETE FROM leave_balances WHERE employee_id = $1 RETURNING *`,
      [employeeId]
    )

    return result.rowCount > 0
  }

}

module.exports = LeaveBalanceRepositoryImpl