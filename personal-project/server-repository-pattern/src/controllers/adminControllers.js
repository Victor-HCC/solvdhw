const UserService = require('../services/UserService')
const EmployeeRepositoryImpl = require('../repositories/EmployeeRepositoryImpl')
const LeaveTypeRepository = require('../repositories/LeaveTypeRepositoryImpl')
const LeaveBalanceRepository = require('../repositories/LeaveBalanceRepositoryImpl')
const LeaveRequestRepository = require('../repositories/LeaveRequestRepositoryImpl')
const { getWorkingDays } = require('../utils/daysCounter')

const employeeRepository = new EmployeeRepositoryImpl()
const leaveTypeRepository = new LeaveTypeRepository()
const leaveBalanceRepository = new LeaveBalanceRepository()
const leaveRequestRepository = new LeaveRequestRepository()
const userService = new UserService()

const createUserAndEmployee = async (name, email, password, departmentId) => {
  // Create the user
  const newUser = await userService.createUser(email, password)
  
  // Create the employee
  const newEmployee = await employeeRepository.create({
    name,
    email,
    departmentId,
    userId: newUser.id, // Associate the employee with the user
    hireDate: new Date()
  })

  // Fetch all leave types
  const leaveTypes = await leaveTypeRepository.getAll()

  // Insert initial leave balances for the new employee
  for(const type of leaveTypes) {
    await leaveBalanceRepository.create({
      employeeId: newEmployee.id,
      leaveTypeId: type.id,
      balance: type.max_days_per_year
    })
  }

  return newEmployee
}

const getAllEmployees = async () => {
  return await employeeRepository.getAll()
}

const getAllLeaveRequests = async (page, limit) => {
  const { leaveRequests, totalCount } = await leaveRequestRepository.getAll(page, limit)

  return { leaveRequests, totalCount, page, limit }
}

// const updateLeaveRequest = async (id, status, timestampColumn) => {
//   const updateRequest = await LeaveRequest.updateStatus(id, status, timestampColumn)

//   return updateRequest
// }

const updateLeaveRequest = async (id, status) => {
  const updatedRequest = await leaveRequestRepository.updateStatus(parseInt(id), status)

  if(status === 'approved') {
    const days = getWorkingDays(updatedRequest.start_date, updatedRequest.end_date)
    // console.log(updatedRequest, 'days:', days);
    await leaveBalanceRepository.decreaseLeaveBalance(updatedRequest.employee_id, updatedRequest.leave_type_id, days)
  }

  return updatedRequest
}

const getRequestsByStatus = async (status) => {
  const leaveRequests = await leaveRequestRepository.findByStatus(status)

  return leaveRequests ? leaveRequests : {}
}

const deleteEmployee = async (id) => {
  const employee = await employeeRepository.findById(id)
  
  return userService.softDeleteUser(employee.user_id)
}

module.exports = { createUserAndEmployee, 
  getAllLeaveRequests, 
  updateLeaveRequest, 
  getRequestsByStatus, 
  deleteEmployee,
  getAllEmployees
}