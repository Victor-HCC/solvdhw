import pool from "./db";
import createAdminUser from "./utils/createAdminUser";
import fs from 'fs'
import path from 'path'

const runScript = async (filePath: string): Promise<void> => {
  try {
    const script = fs.readFileSync(filePath, 'utf-8')
    await pool.query(script)
    console.log('SQL script executed successfully.');
  } catch (error) {
    console.error('Error executing SQL script.', error)    
  }
}

const dbSetup = async (): Promise<void> => {
  try {
    const scriptPath = path.join(__dirname, 'script.sql')
    await runScript(scriptPath)

    await createAdminUser()
  } catch (error) {
    console.error('Error setting up database.', error)
  }
}

export default dbSetup