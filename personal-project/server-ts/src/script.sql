-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(100) DEFAULT 'employee' CHECK (role IN ('admin', 'employee')),
  active BOOLEAN DEFAULT true CHECK (active IN (true, false))
);

-- Create departments table
CREATE TABLE IF NOT EXISTS departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT
);

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  department_id INTEGER REFERENCES departments(id),
  hire_date DATE NOT NULL
);

-- Create leave_types table
CREATE TABLE IF NOT EXISTS leave_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  max_days_per_year INTEGER NOT NULL
);

-- Create leave_status type if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'leave_status') THEN
    CREATE TYPE leave_status AS ENUM ('pending', 'approved', 'rejected');
  END IF;
END $$;

-- Create leave_requests table
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

-- Create leave_balances table
CREATE TABLE IF NOT EXISTS leave_balances (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES employees(id),
  leave_type_id INTEGER REFERENCES leave_types(id),
  balance INTEGER NOT NULL,
  UNIQUE (employee_id, leave_type_id)
);

-- Create holidays table
CREATE TABLE IF NOT EXISTS holidays (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT
);

-- Stored procedure to insert a leave request
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

-- Stored procedure to update leave request status
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

-- Stored procedure to update leave balance
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

-- Insert initial leave types
INSERT INTO leave_types (name, description, max_days_per_year)  
VALUES ('Vacation Leave', 'Time off for personal vacation', 15)
ON CONFLICT (name) DO NOTHING;

INSERT INTO leave_types (name, description, max_days_per_year)  
VALUES ('Sick Leave', 'Time off due to illness', 10)
ON CONFLICT (name) DO NOTHING;

INSERT INTO leave_types (name, description, max_days_per_year)  
VALUES ('Maternity Leave', 'Time off for maternity reasons', 90)
ON CONFLICT (name) DO NOTHING;

INSERT INTO leave_types (name, description, max_days_per_year)  
VALUES ('Paternity Leave', 'Time off for paternity reasons', 15)
ON CONFLICT (name) DO NOTHING;

INSERT INTO leave_types (name, description, max_days_per_year)  
VALUES ('Personal Leave', 'Time off for personal matters', 5)
ON CONFLICT (name) DO NOTHING;

INSERT INTO leave_types (name, description, max_days_per_year)  
VALUES ('Bereavement Leave', 'Time off due to the death of a family member', 5)
ON CONFLICT (name) DO NOTHING;

INSERT INTO leave_types (name, description, max_days_per_year)  
VALUES ('Unpaid Leave', 'Time off without pay', 0)
ON CONFLICT (name) DO NOTHING;

-- Insert initial departments
INSERT INTO departments (name, description)  
VALUES ('Engineering', 'Responsible for developing and maintaining software products')
ON CONFLICT (name) DO NOTHING;

INSERT INTO departments (name, description)  
VALUES ('Product Management', 'Responsible for product planning and execution')
ON CONFLICT (name) DO NOTHING;

INSERT INTO departments (name, description)  
VALUES ('Human Resources', 'Responsible for employee relations, recruitment, and benefits')
ON CONFLICT (name) DO NOTHING;

INSERT INTO departments (name, description)  
VALUES ('Marketing', 'Responsible for market research, advertising, and promotions')
ON CONFLICT (name) DO NOTHING;

INSERT INTO departments (name, description)  
VALUES ('Sales', 'Responsible for selling products and services')
ON CONFLICT (name) DO NOTHING;

INSERT INTO departments (name, description)  
VALUES ('Customer Support', 'Responsible for assisting customers with their issues')
ON CONFLICT (name) DO NOTHING;

INSERT INTO departments (name, description)  
VALUES ('Finance', 'Responsible for financial planning and analysis')
ON CONFLICT (name) DO NOTHING;

INSERT INTO departments (name, description)  
VALUES ('Administration', 'Responsible for administrative tasks and office management')
ON CONFLICT (name) DO NOTHING;
