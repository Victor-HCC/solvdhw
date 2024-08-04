const pool = require('./db');
const createAdminUser = require('./utils/createAdminUser');
const { insertDepartments, insertLeaveTypes } = require('./utils/insertData');

const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(100) DEFAULT 'employee' CHECK (role IN ('admin', 'employee'))
      );
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS departments (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        description TEXT
      );
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS employees (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        department_id INTEGER REFERENCES departments(id),
        hire_date DATE NOT NULL
      );
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS leave_types (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        max_days_per_year INTEGER NOT NULL
      );
    `)

    const typeExistsResult = await pool.query(`
      SELECT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'leave_status'
      );
    `)

    const typeExists = typeExistsResult.rows[0].exists
    
    if(!typeExists) {
      await pool.query(`
        CREATE TYPE leave_status AS ENUM ('pending', 'approved', 'rejected');
      `)
    }

    await pool.query(`
      CREATE TABLE IF NOT EXISTS leave_requests (
        id SERIAL PRIMARY KEY,
        employee_id INTEGER REFERENCES employees(id),
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        leave_type_id INT REFERENCES leave_types(id),
        status leave_status NOT NULL DEFAULT 'pending',
        reason TEXT,
        requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        approved_at TIMESTAMP,
        rejected_at TIMESTAMP
      );
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS leave_balances (
        id SERIAL PRIMARY KEY,
        employee_id INTEGER REFERENCES employees(id),
        leave_type_id INTEGER REFERENCES leave_types(id),
        balance INTEGER NOT NULL,
        UNIQUE (employee_id, leave_type_id)
      );
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS holidays (
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL,
        name VARCHAR(100) NOT NULL,
        description TEXT
      );
    `)

    // Stored procedure to insert a leave request
    await pool.query(`
      CREATE OR REPLACE FUNCTION insert_leave_request(
        p_employee_id INTEGER,
        p_start_date DATE,
        p_end_date DATE,
        p_leave_type_id INTEGER,
        p_reason TEXT
      )
      RETURNS TABLE(
        id INTEGER,
        employee_id INTEGER,
        start_date DATE,
        end_date DATE,
        leave_type_id INTEGER,
        status leave_status,
        reason TEXT,
        requested_at TIMESTAMP,
        approved_at TIMESTAMP,
        rejected_at TIMESTAMP
      ) AS $$
      BEGIN
        RETURN QUERY
        INSERT INTO leave_requests (employee_id, start_date, end_date, leave_type_id, reason, status, requested_at)
        VALUES (p_employee_id, p_start_date, p_end_date, p_leave_type_id, p_reason, 'pending', NOW())
        RETURNING leave_requests.id, leave_requests.employee_id, leave_requests.start_date, leave_requests.end_date, leave_requests.leave_type_id, leave_requests.status, leave_requests.reason, leave_requests.requested_at, leave_requests.approved_at, leave_requests.rejected_at;
      END;
      $$ LANGUAGE plpgsql;
    `)

    // Stored procedure to update leave request status
    await pool.query(`
      CREATE OR REPLACE FUNCTION update_leave_request_status(
        p_leave_request_id INTEGER,
        p_new_status leave_status
      )
      RETURNS TABLE(
        id INTEGER,
        employee_id INTEGER,
        start_date DATE,
        end_date DATE,
        leave_type_id INTEGER,
        status leave_status,
        reason TEXT,
        requested_at TIMESTAMP,
        approved_at TIMESTAMP,
        rejected_at TIMESTAMP
      ) AS $$
      DECLARE 
        v_appr TIMESTAMP := NULL;
        v_rej TIMESTAMP := NULL;
      BEGIN
        IF p_new_status = 'approved' THEN
          v_appr := NOW();
        ELSIF p_new_status = 'rejected' THEN
          v_rej := NOW();
        END IF;

        RETURN QUERY
        UPDATE leave_requests AS lr
        SET 
          status = p_new_status, 
          approved_at = v_appr, 
          rejected_at = v_rej
        WHERE lr.id = p_leave_request_id
        RETURNING 
          lr.id, 
          lr.employee_id, 
          lr.start_date, 
          lr.end_date, 
          lr.leave_type_id, 
          lr.status, 
          lr.reason, 
          lr.requested_at, 
          lr.approved_at, 
          lr.rejected_at;
      END;
      $$ LANGUAGE plpgsql;

    `)

    //Stored procedure to update leave balance
    await pool.query(`
      CREATE OR REPLACE FUNCTION decrease_leave_balance(
        p_employee_id INTEGER,
        p_leave_type_id INTEGER,
        p_days INTEGER
      )
      RETURNS VOID AS $$
      BEGIN
        UPDATE leave_balances
        SET balance = balance - p_days
        WHERE employee_id = p_employee_id AND leave_type_id = p_leave_type_id;
      END;
      $$ LANGUAGE plpgsql;
    `)

    console.log('Tables and stored procedures created successfully');

    await createAdminUser()
    await insertLeaveTypes();
    await insertDepartments();

  } catch (error) {
    console.error('Error creating tables', error)
  } /*finally {
    pool.end()
  }*/
}

module.exports = createTables