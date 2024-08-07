const pool = require("../db");

class LeaveRequest {
  constructor(id, employeeId, startDate, endDate, leaveTypeId, status, reason, requestedAt, approvedAt, rejectedAt) {
    this.id = id
    this.employeeId = employeeId
    this.startDate = startDate
    this.endDate = endDate
    this.leaveTypeId = leaveTypeId
    this.status = status
    this.reason = reason
    this.requestedAt = requestedAt
    this.approvedAt = approvedAt
    this.rejectedAt = rejectedAt
  }

  // static async create({ employeeId, startDate, endDate, leaveTypeId, status = 'pending', reason }) {
  //   const result = await pool.query(
  //     `INSERT INTO leave_requests (employee_id, start_date, end_date, leave_type_id, status, reason, requested_at)
  //     VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP) RETURNING *`,
  //     [employeeId, startDate, endDate, leaveTypeId, status, reason]
  //   )

  //   const row = result.rows[0]

  //   return new LeaveRequest(row.id, row.employee_id, row.start_date, row.end_date, row.leave_type_id, row.status, row.reason, row.requested_at, row.approved_at, row.rejected_at)
  // }

  static async create(employeeId, startDate, endDate, leaveTypeId, reason) {
    const result = await pool.query(
      `SELECT * FROM insert_leave_request($1, $2, $3, $4, $5)`,
      [employeeId, startDate, endDate, leaveTypeId, reason]
    )

    const row = result.rows[0]

    return new LeaveRequest(row.id, row.employee_id, row.start_date, row.end_date, row.leave_type_id, row.status, row.reason, row.requested_at, row.approved_at, row.rejected_at)
  }

  static async getAll(page, limit) {
    const offset = (page - 1) * limit
    
    const leaveRequestsResult = await pool.query(
      `SELECT * FROM leave_requests ORDER BY requested_at DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    )

    const totalCountResult = await pool.query(
      `SELECT COUNT(*) FROM leave_requests`
    )

    const leaveRequests = leaveRequestsResult.rows.map(row => new LeaveRequest(row.id, row.employee_id, row.start_date, row.end_date, row.leave_type_id, row.status, row.reason, row.requested_at, row.approved_at, row.rejected_at))

    const totalCount = parseInt(totalCountResult.rows[0].count, 10)

    return { leaveRequests, totalCount }
  }

  static async findById(id) {
    const result = await pool.query(
      `SELECT * FROM leave_requests WHERE id = $1`,
      [id]
    )

    if(result.rows.length === 0) return null

    const row = result.rows[0]

    return new LeaveRequest(row.id, row.employee_id, row.start_date, row.end_date, row.leave_type_id, row.status, row.reason, row.requested_at, row.approved_at, row.rejected_at)
  }

  // static async findByEmployeeId(employeeId) {
  //   const result = await pool.query(
  //     `SELECT * FROM leave_requests WHERE employee_id = $1`,
  //     [employeeId]
  //   )

  //   if(result.rows.length === 0) return null

  //   return result.rows.map(row => new LeaveRequest(row.id, row.employee_id, row.start_date, row.end_date, row.leave_type_id, row.status, row.reason, row.requested_at, row.approved_at, row.rejected_at))
  // }

  static async findByEmployeeId(employeeId) {
    const result = await pool.query(
      `SELECT lr.id, lr.leave_type_id,lr.start_date, lr.end_date, lr.status, lr.reason, lr.requested_at, lr.approved_at, lr.rejected_at, lt.name AS name_leave_type
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

  static async findByStatus(status) {
    const result = await pool.query(
      `SELECT * FROM leave_requests WHERE status = $1`,
      [status]
    )

    if(result.rows.length === 0) return null

    return result.rows.map(row => new LeaveRequest(row.id, row.employee_id, row.start_date, row.end_date, row.leave_type_id, row.status, row.reason, row.requested_at, row.approved_at, row.rejected_at))
  }

  // static async updateStatus(id, status, timestampColumn) {
  //   const result = await pool.query(
  //     `UPDATE leave_requests SET status = $2, ${timestampColumn} = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
  //     [id, status]
  //   )

  //   if(result.rows.length === 0) return null

  //   const row = result.rows[0]

  //   return new LeaveRequest(row.id, row.employee_id, row.start_date, row.end_date, row.leave_type_id, row.status, row.reason, row.requested_at, row.approved_at, row.rejected_at)
  // }

  static async updateStatus(id, status) {
    const result = await pool.query(
      `SELECT * FROM update_leave_request_status($1, $2)`,
      [id, status]
    )

    const row = result.rows[0]

    return new LeaveRequest(row.id, row.employee_id, row.start_date, row.end_date, row.leave_type_id, row.status, row.reason, row.requested_at, row.approved_at, row.rejected_at)
  }

  static async deleteById(id) {
    const result = await pool.query(
      `DELETE FROM leave_requests WHERE id = $1 RETURNING *`,
      [id]
    )

    return result.rowCount > 0
  }

}

module.exports = LeaveRequest