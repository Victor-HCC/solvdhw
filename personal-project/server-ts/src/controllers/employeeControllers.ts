import LeaveBalanceRepository from '../repositories/LeaveBalanceRepositoryImpl'
import LeaveRequestRepository from '../repositories/LeaveRequestRepositoryImpl'
import { LeaveBalanceWithName, LeaveRequest, LeaveRequestWithName } from '../types/types'

const leaveBalanceRepository = new LeaveBalanceRepository()
const leaveRequestRepository = new LeaveRequestRepository()

export const getLeaveBalanceByEmployeeId = async (employeeId: number): Promise<LeaveBalanceWithName[]> => {
  const result = await leaveBalanceRepository.findByEmployeeId(employeeId)

  return result
}

export const createLeaveRequest = 
  async (employeeId: number, startDate: Date, endDate: Date, leaveTypeId: number, reason: string): Promise<LeaveRequest> => {
    const newLeaveRequest: LeaveRequest = await leaveRequestRepository.create({ employeeId, startDate, endDate, leaveTypeId, reason })

    return newLeaveRequest
  }

export const getLeaveHistoryByEmployeeId = async (employeeId: number): Promise<LeaveRequestWithName[]> => {
  const leaveHistory = await leaveRequestRepository.findByEmployeeId(employeeId)

  return leaveHistory
}