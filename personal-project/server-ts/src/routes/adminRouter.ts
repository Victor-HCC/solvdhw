import { Router } from "express";
import { 
  addEmployeeHandler,
  deleteEmployeeHandler,
  getEmployeesHandler,
  getLeaveRequestHandler,
  getLeaveRequestsByStatusHandler,
  updateLeaveRequestHandler 
} from "../handlers/adminHandlers";

const adminRouter = Router()

adminRouter.post('/add-employee', addEmployeeHandler)
adminRouter.get('/employees/:employeeId?', getEmployeesHandler)
adminRouter.get('/leave-requests', getLeaveRequestHandler)
adminRouter.patch('/leave-requests/:id', updateLeaveRequestHandler)
adminRouter.get('/leave-requests/status/:status', getLeaveRequestsByStatusHandler)
adminRouter.delete('/delete-employee/:employeeId', deleteEmployeeHandler)

export default adminRouter