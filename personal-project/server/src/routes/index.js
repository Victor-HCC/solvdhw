const { Router } = require('express')
const adminRouter = require('./adminRouter')

const router = Router()

router.use('/admin', adminRouter)


module.exports = router