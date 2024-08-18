import pool from "../db";
import { LeaveType } from "../types/types";
import { cleanLeaveTypeData } from "../utils/cleanData";
import LeaveTypeRepository from "./LeaveTypeRepository";

class LeaveTypeRepositoryImpl extends LeaveTypeRepository {
  async getAll(): Promise<LeaveType[]> {
    const result = await pool.query(`SELECT * FROM leave_types`)

    return result.rows.map(cleanLeaveTypeData)
  }
}

export default LeaveTypeRepositoryImpl