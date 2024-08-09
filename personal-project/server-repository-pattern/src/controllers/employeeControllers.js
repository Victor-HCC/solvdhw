const LeaveBalanceRepository = require('../repositories/LeaveBalanceRepositoryImpl')
const LeaveRequestRepository = require('../repositories/LeaveRequestRepositoryImpl')

const leaveBalanceRepository = new LeaveBalanceRepository()
const leaveRequestRepository = new LeaveRequestRepository()

const getLeaveBalanceByEmployeeId = async (employeeID) => {
  const result = await leaveBalanceRepository.findByEmployeeId(employeeID)

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
  const newLeaveRequest = await leaveRequestRepository.create({employeeId, startDate, endDate, leaveTypeId, reason})

  return newLeaveRequest
}

const getLeaveHistoryByEmployeeId = async (employeeId) => {
  const leaveHistory = await leaveRequestRepository.findByEmployeeId(employeeId)

  return leaveHistory
}


module.exports = { getLeaveBalanceByEmployeeId, createLeaveRequest, getLeaveHistoryByEmployeeId }