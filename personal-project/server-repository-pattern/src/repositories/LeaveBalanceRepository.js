class LeaveBalanceRepository {
  create(leaveBalance) {}
  findByEmployeeId(employeeId) {}
  findByEmployeeIdAndLeaveTypeId(employeeId, leaveTypeId) {}
  decreaseLeaveBalance(employeeId, leaveTypeId, days) {}
  deleteByEmployeeId(employeeId) {}
}

module.exports = LeaveBalanceRepository