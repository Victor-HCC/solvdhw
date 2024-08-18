import { LeaveRequest, LeaveRequestInput, LeaveRequestWithName } from "../types/types";

abstract class LeaveRequestRepository {
  abstract create(leaveRequest: LeaveRequestInput): Promise<LeaveRequest>
  abstract getAll(page: number, limit: number): Promise<{ leaveRequests: LeaveRequest[], totalCount: number }>
  abstract findById(id: number): Promise<LeaveRequest | null>
  abstract findByEmployeeId(employeeId: number): Promise<LeaveRequestWithName[] | null>
  abstract findByStatus(status: string): Promise<LeaveRequest[] | null>
  abstract updateStatus(id: number, status: string): Promise<LeaveRequest>
  abstract deleteById(id: number): Promise<boolean>
}

export default LeaveRequestRepository