import { Employee, LeaveType, LeaveRequest, LeaveBalance, LeaveBalanceWithName, LeaveRequestWithName } from "../types/types";

function cleanEmployeeData(row: any): Employee {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    departmentId: row.department_id,
    userId: row.user_id,
    hireDate: row.hire_date
  }
}

function cleanLeaveTypeData(row: any): LeaveType {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    maxDaysPerYear: row.max_days_per_year
  }
}

function cleanLeaveRequestData(row: any): LeaveRequest {
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

function cleanLeaveRequestWithNameData(row: any): LeaveRequestWithName {
  return {
    id: row.id,
    startDate: row.start_date,
    endDate: row.end_date,
    leaveTypeId: row.leave_type_id,
    nameLeaveType: row.name_leave_type,
    status: row.status,
    reason: row.reason,
    requestedAt: row.requested_at,
    approvedAt: row.approved_at,
    rejectedAt: row.rejected_at
  }
}

function cleanLeaveBalanceData(row: any): LeaveBalance {
  return {
    id: row.id,
      employeeId: row.employee_id,
      leaveTypeId: row.leave_type_id,
      balance: row.balance
  }
}

function cleanLeaveBalanceDataWithName(row: any): LeaveBalanceWithName {
  return {
    id: row.id, 
    employeeId: row.employee_id, 
    leaveTypeId: row.leave_type_id, 
    nameLeaveType: row.name_leave_type,
    balance: row.balance
  }
}

export {
  cleanEmployeeData,
  cleanLeaveTypeData,
  cleanLeaveRequestData,
  cleanLeaveBalanceData,
  cleanLeaveBalanceDataWithName,
  cleanLeaveRequestWithNameData
}