const { Router } = require("express");
const { getLeaveBalanceHandler, createLeaveRequestHandler } = require("../handlers/employeeHandlers");

const employeeRouter = Router()

employeeRouter.get('/leave-balance/:employeeId', getLeaveBalanceHandler)
employeeRouter.post('/leave-request', createLeaveRequestHandler)

module.exports = employeeRouter