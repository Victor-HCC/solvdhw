import 'dotenv/config'
import CustomJWT from '../utils/CustomJWT'
import { Request, Response, NextFunction } from 'express'
import { Employee } from '../types/types'

const jwt = new CustomJWT(process.env.SECRET_TOKEN as string)

interface JwtPayload {
  id: number
  employeeData: Employee
  role: 'employee' | 'admin'
}

interface AuthenticatedRequest extends Request {
  user?: JwtPayload
}

const authMiddleware = (roles: string[] = []) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']

    if(!token) {
      res.status(401).json({ message: 'Access Denied.'})
      return
    }

    try {
      const verified = jwt.decode(token) as JwtPayload | null

      if(!verified) {
        throw new Error('Invalid Token.')
      }

      req.user = verified

      if(roles.length && !roles.includes(req.user.role)) {
        res.status(403).json({ message: "You don't have access to this resource."})
        return
      }

      next()
    } catch (error) {
      res.status(400).json({ message: 'Invalid Token.'})
    }
  }
}

export default authMiddleware