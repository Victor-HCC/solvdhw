import pool from "../db";
import { LeaveRequestInput, LeaveRequest, LeaveRequestWithName, AllLeaveRequests } from "../types/types";
import { cleanLeaveRequestData, cleanLeaveRequestWithNameData } from "../utils/cleanData";
import LeaveRequestRepository from "./LeaveRequestRepository";

class LeaveRequestRepositoryImpl extends LeaveRequestRepository {
  async create(leaveRequest: LeaveRequestInput): Promise<LeaveRequest> {
    const result = await pool.query(
      `SELECT * FROM insert_leave_request($1, $2, $3, $4, $5)`,
      [leaveRequest.employeeId, leaveRequest.startDate, leaveRequest.endDate, leaveRequest.leaveTypeId, leaveRequest.reason]
    )

    return cleanLeaveRequestData(result.rows[0])
  }

  async getAll(page: number, limit: number): Promise<AllLeaveRequests> {
    const offset = (page - 1) * limit

    const result = await pool.query(
      `SELECT * FROM leave_requests ORDER BY requested_at DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    )

    const totalCountResult = await pool.query(
      `SELECT COUNT(*) FROM leave_requests`
    )

    const totalCount = parseInt(totalCountResult.rows[0].count, 10)

    return { leaveRequests: result.rows.map(cleanLeaveRequestData), totalCount, page, limit }
  }

  async findById(id: number): Promise<LeaveRequest | null> {
    const result = await pool.query(
      `SELECT * FROM leave_requests WHERE id = $1`, [id]
    )

    if(result.rows.length === 0) return null

    return cleanLeaveRequestData(result.rows[0])
  }

  async findByEmployeeId(employeeId: number): Promise<LeaveRequestWithName[]> {
    const result = await pool.query(
      `SELECT lr.id, lr.leave_type_id, lr.start_date, lr.end_date, lr.status, lr.reason, lr.requested_at, lr.approved_at, lr.rejected_at, lt.name AS name_leave_type
      FROM leave_requests lr
      JOIN leave_types lt ON lr.leave_type_id = lt.id
      WHERE lr.employee_id = $1`,
      [employeeId]
    )

    return result.rows.length ? result.rows.map(cleanLeaveRequestWithNameData) : []
  }

  async findByStatus(status: string): Promise<LeaveRequest[] | null> {
    const result = await pool.query(`SELECT * FROM leave_requests WHERE status = $1`, [status])

    if(result.rows.length === 0) return null

    return result.rows.map(cleanLeaveRequestData)
  }

  async updateStatus(id: number, status: string): Promise<LeaveRequest> {
    const result = await pool.query(
      `SELECT * FROM update_leave_request_status($1, $2)`,
      [id, status]
    )

    return cleanLeaveRequestData(result.rows[0])
  }

  async deleteById(id: number): Promise<boolean> {
    const result = await pool.query(
      `DELETE FROM leave_requests WHERE id = $1`, [id]
    )

    if(result.rowCount === 0) {
      return false
    }

    return true
  }
  
}

export default LeaveRequestRepositoryImpl