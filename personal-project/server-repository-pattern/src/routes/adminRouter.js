const { Router } = require("express");
const { addEmployeeHandler, getLeaveRequestsHandler, updateLeaveRequestHandler, getRequestsByStatusHandler, deleteEmployeeHandler, getEmployeesHandler } = require("../handlers/adminHandlers");
const adminRouter = Router()

adminRouter.post('/add-employee', addEmployeeHandler)
adminRouter.get('/employees', getEmployeesHandler)
adminRouter.get('/leave-requests', getLeaveRequestsHandler)
adminRouter.patch('/leave-requests/:id', updateLeaveRequestHandler)
adminRouter.get('/leave-requests/status/:status', getRequestsByStatusHandler)
adminRouter.delete('/delete-employee/:employeeId', deleteEmployeeHandler)

module.exports = adminRouter