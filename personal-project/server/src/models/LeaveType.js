const pool = require('../db')

class LeaveType {
  constructor(id, name, description, maxDaysPerYear) {
    this.id = id
    this.name = name
    this.description = description
    this.maxDaysPerYear = maxDaysPerYear
  }

  static async getAll() {
    const result = await pool.query('SELECT id, name, description, max_days_per_year FROM leave_types')
    return result.rows.map(row => new LeaveType(row.id, row.name, row.description, row.max_days_per_year))
  }
}

module.exports = LeaveType