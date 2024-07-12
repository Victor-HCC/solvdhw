const { createUserAndEmployee } = require("../controllers/adminControllers")

const addEmployeeHandler = async (req, res) => {
  try {
    const { name, email, position, annualLeaveDays, sickLeaveDays, unpaidLeaveDays } = req.body
    const newEmployee = await createUserAndEmployee(name, email, position, annualLeaveDays, sickLeaveDays, unpaidLeaveDays)

    res.status(201).json(newEmployee)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { addEmployeeHandler }