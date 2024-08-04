const { getLeaveBalanceByEmployeeId, createLeaveRequest } = require("../controllers/employeeControllers")

const getLeaveBalanceHandler = async (req, res) => {
  try {
    const { employeeId } = req.params
    const result = await getLeaveBalanceByEmployeeId(employeeId)

    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const createLeaveRequestHandler = async (req, res) => {
  try {
    const { employeeId, startDate, endDate, leaveTypeId, reason } = req.body
    const newLeaveRequest = await createLeaveRequest(employeeId, startDate, endDate, leaveTypeId, reason)

    // console.log(newLeaveRequest);
    res.status(201).json(newLeaveRequest)
  } catch (error) {
    res.status(400).json({ error})
  }
  
}

module.exports = { getLeaveBalanceHandler, createLeaveRequestHandler }