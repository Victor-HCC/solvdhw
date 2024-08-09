const { createUserAndEmployee, getAllEmployees, getAllLeaveRequests, updateLeaveRequest, getRequestsByStatus, deleteEmployee } = require("../controllers/adminControllers")

const addEmployeeHandler = async (req, res) => {
  try {
    const { name, email, password, departmentId } = req.body
    const newEmployee = await createUserAndEmployee(name, email, password, departmentId)

    res.status(201).json(newEmployee)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getEmployeesHandler = async (req, res) => {
  try {
    const employees = await getAllEmployees()
    
    res.status(200).json(employees)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getLeaveRequestsHandler = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query
    const leaveRequests = await getAllLeaveRequests(page, limit)

    res.status(200).json(leaveRequests)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const updateLeaveRequestHandler = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const updateRequest = await updateLeaveRequest(id, status)

    res.status(200).json(updateRequest)
  } catch (error) {
    res.status(400).json(error)
  }
}

const getRequestsByStatusHandler = async (req, res) => {
  try {
    const { status } = req.params

    const leaveRequests = await getRequestsByStatus(status)
    
    res.status(200).json(leaveRequests)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteEmployeeHandler = async (req, res) => {
  try {
    const { employeeId } = req.params
    
    const deleted = await deleteEmployee(employeeId)

    if(!deleted) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully.'})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { 
  addEmployeeHandler, 
  getLeaveRequestsHandler, 
  updateLeaveRequestHandler, 
  getRequestsByStatusHandler, 
  deleteEmployeeHandler,
  getEmployeesHandler
}