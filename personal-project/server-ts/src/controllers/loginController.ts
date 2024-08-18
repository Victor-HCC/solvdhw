import EmployeeRepositoryImpl from '../repositories/EmployeeRepositoryImpl'
import UserService from '../services/UserService'
import 'dotenv/config'
import CustomJWT from '../utils/CustomJWT'
import { Response, Request } from 'express'
import { Employee, User } from '../types/types'

const jwt = new CustomJWT(process.env.SECRET_TOKEN as string)

const employeeRepository = new EmployeeRepositoryImpl()
const userService = new UserService()

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body
    const user: User | null = await userService.findUserByUsername(username)

    if(!user) {
      res.status(400).json({ message: 'Invalid credentials.' })
      return
    }
    
    const validPass: boolean = await userService.isPasswordCorrect(username, password)

    if(!validPass) {
      res.status(400).json({ message: 'Invalid credentials.' })
      return
    }
    
    const employeeData: Employee | null = user.role === 'admin' ? null : await employeeRepository.findByUserId(user.id)

    const token = jwt.encode({ id: user.id, employeeData, role: user.role })
    res.header('authorization', token).json({ message: 'Logged in.', token })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      // Fallback for non-standard errors
      res.status(400).json({ error: 'An unknown error occurred at login.' });
    }
  }
}

export { login }