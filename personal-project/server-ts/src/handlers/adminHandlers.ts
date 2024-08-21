import { Request, Response } from "express";
import { AllEmployees, Employee, LeaveRequestStatus } from "../types/types";
import { 
  createUserAndEmployee, 
  deleteEmployee, 
  getAllEmployees, 
  getAllLeaveRequests, 
  getEmployeeById, 
  getLeaveRequestsByStatus, 
  updateLeaveRequest 
} from "../controllers/adminControllers";

export const addEmployeeHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, departmentId } = req.body

    if(name.length === 0 || email.length === 0 || password.length === 0 || departmentId.length === 0) {
      res.status(400).json({ error: 'Some fields are empty.'})
      return
    }
    const newEmployee: Employee = await createUserAndEmployee(name, email, password, parseInt(departmentId))

    res.status(201).json(newEmployee)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred at creating new employee.' });
    }
  }
}

export const getEmployeesHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const employeeId: number = parseInt(req.params.employeeId)

    if(employeeId) {
      const employee: Employee | null = await getEmployeeById(employeeId)

      if(employee) {
        res.status(200).json(employee)
        return
      } else {
        res.status(404).json({ message: 'Employee not found.'})
        return
      }
    }

    const employees: AllEmployees = await getAllEmployees()
    
    res.status(200).json(employees)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred at getting all employees.' });
    }
  }
}

export const getLeaveRequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const page: number = parseInt(req.query.page as string, 10) || 1
    const limit: number = parseInt(req.query.limit as string, 10) || 10

    const leaveRequests = await getAllLeaveRequests(page, limit)

    res.status(200).json(leaveRequests)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred at getting all leave requests.' });
    }
  }
}

export const updateLeaveRequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id)
    const status: LeaveRequestStatus = req.body.status
    
    const updateRequest = await updateLeaveRequest(id, status)
    res.status(200).json(updateRequest)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred at updating the leave request.' });
    }
  }
}

export const getLeaveRequestsByStatusHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.params

    if(status === 'pending' || status === 'approved' || status === 'rejected') {
      const leaveRequests = await getLeaveRequestsByStatus(status as LeaveRequestStatus);
      res.status(200).json(leaveRequests);
    } else {
      res.status(400).json({ error: 'Invalid status provided.' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred at getting the leave requests.' });
    }
  }
}

export const deleteEmployeeHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const employeeId = parseInt(req.params.employeeId)
    const deleted = await deleteEmployee(employeeId)

    if(!deleted) {
      res.status(404).json({ message: 'Employee not found.'})
      return
    }

    res.status(200).json({ message: 'Employee deleted successfully.'})
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred at deleting the employee.' });
    }
  }
}