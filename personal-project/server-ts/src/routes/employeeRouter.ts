import { Router } from "express";
import { createLeaveRequestHandler, getLeaveBalanceHandler, getLeaveHistoryHandler } from "../handlers/employeeHandlers";

const employeeRouter = Router()

employeeRouter.get('/leave-balance/:employeeId', getLeaveBalanceHandler)
employeeRouter.get('/leave-history/:employeeId', getLeaveHistoryHandler)
employeeRouter.post('/leave-request/:employeeId', createLeaveRequestHandler)

export default employeeRouter