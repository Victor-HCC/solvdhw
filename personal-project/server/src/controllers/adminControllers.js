const User = require('../models/User')
const Employee = require('../models/Employee')

const createUserAndEmployee = async (name, email, position, annualLeaveDays, sickLeaveDays, unpaidLeaveDays) => {
  const newUser = await User.create({
    username: email,
    password: '123456',
    email
  })

  const newEmployee = await Employee.create({
    name,
    email,
    position,
    annualLeaveDays,
    sickLeaveDays,
    unpaidLeaveDays,
    userId: newUser.id // Associate the employee with the user
  })

  return newEmployee
}

module.exports = { createUserAndEmployee }