const { Router } = require("express");
const { addEmployeeHandler, getLeaveRequestsHandler, updateLeaveRequestHandler, getRequestsByStatusHandler } = require("../handlers/adminHandlers");
const adminRouter = Router()

adminRouter.post('/add-employee', addEmployeeHandler)
adminRouter.get('/leave-requests', getLeaveRequestsHandler)
adminRouter.patch('/leave-requests/:id', updateLeaveRequestHandler)
adminRouter.get('/leave-requests/status/:status', getRequestsByStatusHandler)

module.exports = adminRouter