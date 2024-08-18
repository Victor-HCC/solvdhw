import UserService from "../services/UserService";
import EmployeeRepository from "../repositories/EmployeeRepositoryImpl";
import LeaveTypeRepository from "../repositories/LeaveTypeRepositoryImpl";
import LeaveBalanceRepository from "../repositories/LeaveBalanceRepositoryImpl";
import LeaveRequestRepository from "../repositories/LeaveRequestRepositoryImpl";
import getWorkingDays from "../utils/daysCounter";
import { AllEmployees, AllLeaveRequests, Employee, EmployeeInput, LeaveRequest, LeaveRequestStatus, LeaveType, User } from "../types/types";

const employeeRepository = new EmployeeRepository()
const leaveTypeRepository = new LeaveTypeRepository()
const leaveBalanceRepository = new LeaveBalanceRepository()
const leaveRequestRepository = new LeaveRequestRepository()
const userService = new UserService()

export const createUserAndEmployee = 
  async (name: string, email: string, password: string, departmentId: number): Promise<Employee> => {
    //Create the user
    const newUser: User = await userService.createUser(email, password)

    //Create the employee
    const newEmployee = await employeeRepository.create({
      name,
      email,
      departmentId,
      userId: newUser.id, //Associate the employee with the user
      hireDate: new Date()
    })

    //fetch all leave types
    const leaveTypes: LeaveType[] = await leaveTypeRepository.getAll()

    //Insert initial leave balances for the new employee
    for(const type of leaveTypes) {
      await leaveBalanceRepository.create({
        employeeId: newEmployee.id,
        leaveTypeId: type.id,
        balance: type.maxDaysPerYear
      })
    }

    return newEmployee
  }

export const getAllEmployees = async (): Promise<AllEmployees> => {
  return await employeeRepository.getAll()
}

export const getEmployeeById = async (id: number): Promise<Employee | null> => {
  return await employeeRepository.findById(id)
}

export const getAllLeaveRequests = async (page: number, limit: number): Promise<AllLeaveRequests> => {
  const { leaveRequests, totalCount } = await leaveRequestRepository.getAll(page, limit)

  return { leaveRequests, totalCount, page, limit }
}

export const updateLeaveRequest = async (id: number, status: LeaveRequestStatus): Promise<LeaveRequest> => {
  const updatedRequest: LeaveRequest = await leaveRequestRepository.updateStatus(id, status)

  if(status === 'approved') {
    const days: number = getWorkingDays(updatedRequest.startDate, updatedRequest.endDate)

    await leaveBalanceRepository.decreaseLeaveBalance(updatedRequest.employeeId, updatedRequest.leaveTypeId, days)
  }

  return updatedRequest
}

export const getLeaveRequestsByStatus = async (status: LeaveRequestStatus): Promise<LeaveRequest[]> => {
  const leaveRequests = await leaveRequestRepository.findByStatus(status)

  return leaveRequests ? leaveRequests : []
}

export const deleteEmployee = async (id: number): Promise<boolean> => {
  const employee = await employeeRepository.findById(id)

  return employee ? userService.softDeleteUser(employee.userId) : false
}
