const Employee = require("../models/Employee");
const User = require("../models/User")
require("dotenv").config();
const jwt = require('../utils/JWT')(process.env.SECRET_TOKEN)

const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findByUsername(username)
    if(!user) return res.status(400).json({ message: 'Invalid credentials'})
    
    const validPass = await user.isPasswordCorrect(password)
    if(!validPass) return res.status(400).json({ message: 'Invalid credential'})

    const employeeData = await Employee.findByUserId(user.id)
    
    // console.log(user);
    const token = jwt.encode({ id: user.id, employeeData, role: user.role })
    res.header('authorization', token).json({ message: 'Logged in', token })
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { login }