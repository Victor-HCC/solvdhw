const pool = require('./db');
const createAdminUser = require('./utils/createAdminUser');
const fs = require('fs')
const path = require('path')

const runScript = async (filePath) => {
  try {
    const script = fs.readFileSync(filePath, 'utf-8')
    await pool.query(script)
    console.log('SQL script executed successfully.');
  } catch (error) {
    console.error('Error executing SQL script', error)
  }
}

const dbSetup = async () => {
  try {
    const scriptPath = path.join(__dirname, 'script.sql')
    await runScript(scriptPath)

    await createAdminUser()

  } catch (error) {
    console.error('Error setting up database', error)
  } /*finally {
    pool.end()
  }*/
}

module.exports = dbSetup