function cleanEmployeeData(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    departmentId: row.department_id,
    userId: row.user_id,
    hireDate: row.hire_date
  }
}

module.exports = {
  cleanEmployeeData
}