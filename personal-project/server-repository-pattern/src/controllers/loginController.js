const EmployeeRepositoryImpl = require("../repositories/EmployeeRepositoryImpl");
const UserService = require("../services/UserService");

require("dotenv").config();
const jwt = require('../utils/JWT')(process.env.SECRET_TOKEN)

const employeeRepository = new EmployeeRepositoryImpl()
const userService = new UserService()

const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await userService.findUserByUsername(username)
    if(!user) return res.status(400).json({ message: 'Invalid credentials'})
    
    const validPass = await userService.isPasswordCorrect(username, password)
    if(!validPass) return res.status(400).json({ message: 'Invalid credential'})

    const employeeData = await employeeRepository.findByUserId(user.id)
    
    // console.log(user);
    const token = jwt.encode({ id: user.id, employeeData, role: user.role })
    res.header('authorization', token).json({ message: 'Logged in', token })
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { login }