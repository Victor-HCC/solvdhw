const { createUserAndEmployee, getAllLeaveRequests, updateLeaveRequest, getRequestsByStatus } = require("../controllers/adminControllers")

const addEmployeeHandler = async (req, res) => {
  try {
    const { name, email, password, departmentId } = req.body
    const newEmployee = await createUserAndEmployee(name, email, password, departmentId)

    res.status(201).json(newEmployee)
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

module.exports = { addEmployeeHandler, getLeaveRequestsHandler, updateLeaveRequestHandler, getRequestsByStatusHandler }