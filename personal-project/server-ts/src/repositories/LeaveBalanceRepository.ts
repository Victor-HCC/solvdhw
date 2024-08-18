import { LeaveBalanceInput, LeaveBalance, LeaveBalanceWithName } from "../types/types";

abstract class LeaveBalanceRepository {
  abstract create(leaveBalance: LeaveBalanceInput): Promise<LeaveBalance>
  abstract findByEmployeeId(employeeId: number): Promise<LeaveBalanceWithName[]>
  abstract findByEmployeeIdAndLeaveTypeId(employeeId: number, leaveTypeId: number): Promise<LeaveBalance | null>
  abstract decreaseLeaveBalance(employeeId: number, leaveTypeId: number, days: number): Promise<void>
  abstract deleteByEmployeeId(employeeId: number): Promise<boolean>
}

export default LeaveBalanceRepository