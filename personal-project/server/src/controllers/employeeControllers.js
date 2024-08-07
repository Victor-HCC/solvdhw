const LeaveBalance = require("../models/LeaveBalance");
const LeaveRequest = require("../models/LeaveRequest");

const getLeaveBalanceByEmployeeId = async (employeeID) => {
  const result = await LeaveBalance.findByEmployeeId(employeeID)

  return result
}

// const createLeaveRequest = async (employeeId, startDate, endDate, leaveTypeId, reason) => {
//   const newLeaveRequest = await LeaveRequest.create({
//     employeeId,
//     startDate,
//     endDate,
//     leaveTypeId,
//     reason
//   })

//   return newLeaveRequest
// }

const createLeaveRequest = async (employeeId, startDate, endDate, leaveTypeId, reason) => {
  const newLeaveRequest = await LeaveRequest.create(employeeId, startDate, endDate, leaveTypeId, reason)

  return newLeaveRequest
}

const getLeaveHistoryByEmployeeId = async (employeeId) => {
  const leaveHistory = await LeaveRequest.findByEmployeeId(employeeId)

  return leaveHistory
}


module.exports = { getLeaveBalanceByEmployeeId, createLeaveRequest, getLeaveHistoryByEmployeeId }