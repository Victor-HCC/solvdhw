const { Router } = require('express')
const adminRouter = require('./adminRouter')
const employeeRouter = require('./employeeRouter')
const loginRouter = require('./loginRouter')
const authMiddleware = require('../middlewares/authMiddleware')

const router = Router()

router.use('/login', loginRouter)
router.use('/admin', authMiddleware('admin'), adminRouter)
router.use('/employee', authMiddleware(['employee', 'admin']), employeeRouter)


module.exports = router