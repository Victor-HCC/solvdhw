const { Router } = require("express");
const { addEmployeeHandler } = require("../handlers/adminHandlers");
const adminRouter = Router()

adminRouter.post('/add-employee', addEmployeeHandler)

module.exports = adminRouter