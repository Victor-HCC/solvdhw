import { LeaveType } from "../types/types";

abstract class LeaveTypeRepository {
  abstract getAll(): Promise<LeaveType[]>
}

export default LeaveTypeRepository