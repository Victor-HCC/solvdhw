function cleanEmployeeData(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    departmentId: row.department_id,
    userId: row.user_id,
    hireDate: row.hire_date
  }
}

function cleanLeaveTypeData(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    maxDaysPerYear: row.max_days_per_year
  }
}

function cleanLeaveRequestData(row) {
  return {
    id: row.id,
    employeeId: row.employee_id,
    startDate: row.start_date,
    endDate: row.end_date,
    leaveTypeId: row.leave_type_id,
    status: row.status,
    reason: row.reason,
    requestedAt: row.requested_at,
    approvedAt: row.approved_at,
    rejectedAt: row.rejected_at
  }
}

module.exports = {
  cleanEmployeeData,
  cleanLeaveTypeData,
  cleanLeaveRequestData
}