const pool = require("../db");
const { cleanLeaveRequestData } = require("../utils/dataCleaners");
const LeaveRequestRepository = require("./LeaveRequestRepository");

class LeaveRequestRepositoryImpl extends LeaveRequestRepository {
  async create(leaveRequest) {
    const result = await pool.query(
      `SELECT * FROM insert_leave_request($1, $2, $3, $4, $5)`,
      [leaveRequest.employeeId, leaveRequest.startDate, leaveRequest.endDate, leaveRequest.leaveTypeId, leaveRequest.reason]
    )

    return cleanLeaveRequestData(result.rows[0])
  }

  async getAll(page, limit) {
    const offset = (page - 1) * limit
    
    const result = await pool.query(
      `SELECT * FROM leave_requests ORDER BY requested_at DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    )

    const totalCountResult = await pool.query(
      `SELECT COUNT(*) FROM leave_requests`
    )

    const totalCount = parseInt(totalCountResult.rows[0].count, 10)

    return { leaveRequests: result.rows.map(cleanLeaveRequestData), totalCount }
  }

  async findById(id) {
    const result = await pool.query(
      `SELECT * FROM leave_requests WHERE id = $1`,
      [id]
    )

    if(result.rows.length === 0) return null

    return cleanLeaveRequestData(result.rows[0])
  }

  async findByEmployeeId(employeeId) {
    const result = await pool.query(
      `SELECT lr.id, lr.leave_type_id, lr.start_date, lr.end_date, lr.status, lr.reason, lr.requested_at, lr.approved_at, lr.rejected_at, lt.name AS name_leave_type
      FROM leave_requests lr
      JOIN leave_types lt ON lr.leave_type_id = lt.id
      WHERE lr.employee_id = $1`,
      [employeeId]
    )

    return result.rows.map(row => ({
      id: row.id,
      leaveTypeId: row.leave_type_id,
      nameLeaveType: row.name_leave_type,
      startDate: row.start_date,
      endDate: row.end_date,
      status: row.status,
      reason: row.reason,
      requestedAt: row.requested_at,
      approvedAt: row.approved_at,
      rejectedAt: row.rejected_at,
    }))
  }

  async findByStatus(status) {
    const result = await pool.query(
      `SELECT * FROM leave_requests WHERE status = $1`,
      [status]
    )

    if(result.rows.length === 0) return null

    return result.rows.map(cleanLeaveRequestData)
  }

  async updateStatus(id, status) {
    const result = await pool.query(
      `SELECT * FROM update_leave_request_status($1, $2)`,
      [id, status]
    )

    return cleanLeaveRequestData(result.rows[0])
  }

  async deleteById(id) {
    const result = await pool.query(
      `DELETE FROM leave_requests WHERE id = $1 RETURNING *`,
      [id]
    )

    return result.rowCount > 0
  }

}

module.exports = LeaveRequestRepositoryImpl