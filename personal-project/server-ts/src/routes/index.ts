import { Router } from "express";
import loginRouter from "./loginRouter";
import authMiddleware from "../middlewares/authMiddleware";
import adminRouter from "./adminRouter";
import employeeRouter from "./employeeRouter";

const router = Router()

router.use('/login', loginRouter)
router.use('/admin', authMiddleware(['admin']), adminRouter)
router.use('/employee', authMiddleware(['admin', 'employee']), employeeRouter)

export default router