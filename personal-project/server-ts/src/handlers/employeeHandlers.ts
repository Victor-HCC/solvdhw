import { Request, Response } from "express";
import { createLeaveRequest, getLeaveBalanceByEmployeeId, getLeaveHistoryByEmployeeId } from "../controllers/employeeControllers";

export const getLeaveBalanceHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const employeeId = parseInt(req.params.employeeId)

    if(isNaN(employeeId)) {
      res.status(400).json({ error: 'Invalid employee ID provided.' });
      return
    }

    const result = await getLeaveBalanceByEmployeeId(employeeId)

    res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred at getting the leave balance.' });
    }
  }
}

export const createLeaveRequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const employeeId = parseInt(req.params.employeeId)

    if(isNaN(employeeId)) {
      res.status(400).json({ error: 'Invalid employee ID provided.' });
      return;
    }

    const { startDate, endDate, leaveTypeId, reason } = req.body
    const newLeaveRequest = await createLeaveRequest(employeeId, startDate, endDate, leaveTypeId, reason)

    res.status(201).json(newLeaveRequest)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred at creating the leave request.' });
    }
  }
}

export const getLeaveHistoryHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const employeeId = parseInt(req.params.employeeId)

    if(isNaN(employeeId)) {
      res.status(400).json({ error: 'Invalid employee ID provided.' });
      return;
    }

    const leaveHistory = await getLeaveHistoryByEmployeeId(employeeId)

    res.status(200).json({ employeeId, leaveHistory })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred at getting the leave request history.' });
    }
  }
}