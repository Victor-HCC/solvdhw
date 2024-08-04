const User = require('../models/User')
const Employee = require('../models/Employee')
const LeaveType = require('../models/LeaveType')
const LeaveBalance = require('../models/LeaveBalance')
const LeaveRequest = require('../models/LeaveRequest')
const { getWorkingDays } = require('../utils/daysCounter')

const createUserAndEmployee = async (name, email, password, departmentId) => {
  // Create the user
  const newUser = await User.create({
    username: email,
    password
  })

  // Create the employee
  const newEmployee = await Employee.create({
    name,
    email,
    departmentId,
    userId: newUser.id, // Associate the employee with the user
    hireDate: new Date()
  })

  // Fetch all leave types
  const leaveTypes = await LeaveType.getAll()

  // Insert initial leave balances for the new employee
  for(const type of leaveTypes) {
    await LeaveBalance.create({
      employeeId: newEmployee.id,
      leaveTypeId: type.id,
      balance: type.maxDaysPerYear
    })
  }

  return newEmployee
}

const getAllLeaveRequests = async (page, limit) => {
  const { leaveRequests, totalCount } = await LeaveRequest.getAll(page, limit)

  return { leaveRequests, totalCount, page, limit }
}

// const updateLeaveRequest = async (id, status, timestampColumn) => {
//   const updateRequest = await LeaveRequest.updateStatus(id, status, timestampColumn)

//   return updateRequest
// }

const updateLeaveRequest = async (id, status) => {
  const updatedRequest = await LeaveRequest.updateStatus(parseInt(id), status)

  if(status === 'approved') {
    const days = getWorkingDays(updatedRequest.startDate, updatedRequest.endDate)
    // console.log(updatedRequest);
    await LeaveBalance.decreaseLeaveBalance(updatedRequest.employeeId, updatedRequest.leaveTypeId, days)
  }

  return updatedRequest
}

const getRequestsByStatus = async (status) => {
  const leaveRequests = await LeaveRequest.findByStatus(status)

  return leaveRequests ? leaveRequests : {}
}

module.exports = { createUserAndEmployee, getAllLeaveRequests, updateLeaveRequest, getRequestsByStatus }