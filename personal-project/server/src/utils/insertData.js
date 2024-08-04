const pool = require('../db')

const insertLeaveTypes = async () => {
  try {
    const leaveTypes = [
      { name: 'Vacation Leave', description: 'Time off for personal vacation', maxDaysPerYear: 15 },
      { name: 'Sick Leave', description: 'Time off due to illness', maxDaysPerYear: 10 },
      { name: 'Maternity Leave', description: 'Time off for maternity reasons', maxDaysPerYear: 90 },
      { name: 'Paternity Leave', description: 'Time off for paternity reasons', maxDaysPerYear: 15 },
      { name: 'Personal Leave', description: 'Time off for personal matters', maxDaysPerYear: 5 },
      { name: 'Bereavement Leave', description: 'Time off due to the death of a family member', maxDaysPerYear: 5 },
      { name: 'Unpaid Leave', description: 'Time off without pay', maxDaysPerYear: 0 }
    ]

    for(const leaveType of leaveTypes) {
      await pool.query(`
        INSERT INTO leave_types (name, description, max_days_per_year)  
        VALUES ($1, $2, $3)
        ON CONFLICT (name) DO NOTHING;
      `, [leaveType.name, leaveType.description, leaveType.maxDaysPerYear]
      )
    }

    console.log('Leave types inserted successfully');
  } catch (error) {
    console.error('Error inserting leave types', error.message)
  }
}

const insertDepartments = async () => {
  try {
    const departments = [
      { name: 'Engineering', description: 'Responsible for developing and maintaining software products' },
      { name: 'Product Management', description: 'Responsible for product planning and execution' },
      { name: 'Human Resources', description: 'Responsible for employee relations, recruitment, and benefits' },
      { name: 'Marketing', description: 'Responsible for market research, advertising, and promotions' },
      { name: 'Sales', description: 'Responsible for selling products and services' },
      { name: 'Customer Support', description: 'Responsible for assisting customers with their issues' },
      { name: 'Finance', description: 'Responsible for financial planning and analysis' },
      { name: 'Administration', description: 'Responsible for administrative tasks and office management' }
    ]

    for(const department of departments) {
      await pool.query(`
        INSERT INTO departments (name, description)  
        VALUES ($1, $2)
        ON CONFLICT (name) DO NOTHING;
      `, [department.name, department.description]
      )
    }

    console.log('Departments inserted successfully');
  } catch (error) {
    console.error('Error inserting departments', error.message)
  }
}

module.exports = {
  insertLeaveTypes,
  insertDepartments
}