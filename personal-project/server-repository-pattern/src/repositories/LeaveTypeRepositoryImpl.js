const pool = require("../db");
const LeaveTypeRepository = require("./LeaveTypeRepository");

class LeaveTypeRepositoryImpl extends LeaveTypeRepository {
  async getAll() {
    const result = await pool.query('SELECT * FROM leave_types')

    return result.rows
  }
}

module.exports = LeaveTypeRepositoryImpl