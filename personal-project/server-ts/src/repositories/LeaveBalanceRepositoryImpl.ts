import pool from "../db";
import { LeaveBalanceInput, LeaveBalance, LeaveBalanceWithName } from "../types/types";
import { cleanLeaveBalanceData, cleanLeaveBalanceDataWithName } from "../utils/cleanData";
import LeaveBalanceRepository from "./LeaveBalanceRepository";

class LeaveBalanceRepositoryImpl extends LeaveBalanceRepository {
  async create(leaveBalance: LeaveBalanceInput): Promise<LeaveBalance> {
    const result = await pool.query(`
      INSERT INTO leave_balances (employee_id, leave_type_id, balance)
      VALUES ($1, $2, $3) RETURNING *
      `, [leaveBalance.employeeId, leaveBalance.leaveTypeId, leaveBalance.balance]
    )
    
    return cleanLeaveBalanceData(result.rows[0])
  }

  async findByEmployeeId(employeeId: number): Promise<LeaveBalanceWithName[]> {
    const result = await pool.query(
      `SELECT lb.id, lb.employee_id, lb.leave_type_id, lt.name AS name_leave_type, lb.balance
      FROM leave_balances lb
      JOIN leave_types lt ON lb.leave_type_id = lt.id
      WHERE lb.employee_id = $1`,
      [employeeId]
    )

    return result.rows.map(cleanLeaveBalanceDataWithName)
  }

  async findByEmployeeIdAndLeaveTypeId(employeeId: number, leaveTypeId: number): Promise<LeaveBalance | null> {
    const result = await pool.query(
      `SELECT * FROM leave_balances WHERE employee_id = $1 AND leave_type_id = $2`,
      [employeeId, leaveTypeId]
    )

    if(result.rows.length === 0) return null

    return cleanLeaveBalanceData(result.rows[0])
  }

  async decreaseLeaveBalance(employeeId: number, leaveTypeId: number, days: number): Promise<void> {
    await pool.query(
      `SELECT * FROM decrease_leave_balance($1, $2, $3)`,
      [employeeId, leaveTypeId, days]
    )
  }

  async deleteByEmployeeId(employeeId: number): Promise<boolean> {
    const result = await pool.query(
      `DELETE FROM leave_balances WHERE employee_id = $1 RETURNING *`,
      [employeeId]
    )

    if(result.rowCount === 0) {
      return false;
    }
  
    return true;
  }
  
}

export default LeaveBalanceRepositoryImpl