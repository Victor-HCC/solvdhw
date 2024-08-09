const { Router } = require("express");
const { getLeaveBalanceHandler, createLeaveRequestHandler, getLeaveHistoryHandler } = require("../handlers/employeeHandlers");

const employeeRouter = Router()

employeeRouter.get('/leave-balance/:employeeId', getLeaveBalanceHandler)
employeeRouter.get('/leave-history/:employeeId', getLeaveHistoryHandler)
employeeRouter.post('/leave-request', createLeaveRequestHandler)

module.exports = employeeRouter