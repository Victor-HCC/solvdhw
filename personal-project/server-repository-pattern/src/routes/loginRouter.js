const { Router } = require("express");
const { login } = require("../controllers/loginController");

const loginRouter = Router()

loginRouter.post('', login)

module.exports = loginRouter