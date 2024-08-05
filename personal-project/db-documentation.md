# Database Schema Documentation

## Overview
This document provides a detailed overview of the database schema used in the Leave Management system, including tables, columns, relationships, and stored procedures.

## Tables and Columns

### `users`
Stores user information.
- `id` (SERIAL PRIMARY KEY): Unique identifier for the user.
- `username` (VARCHAR(255) UNIQUE NOT NULL): Username for the user.
- `password` (VARCHAR(255) NOT NULL): Password for the user.
- `role` (VARCHAR(100) DEFAULT 'employee'): Role of the user (either 'admin' or 'employee').

### `departments`
Stores department information.
- `id` (SERIAL PRIMARY KEY): Unique identifier for the department.
- `name` (VARCHAR(100) UNIQUE NOT NULL): Name of the department.
- `description` (TEXT): Description of the department.

### `employees`
Stores employee information.
- `id` (SERIAL PRIMARY KEY): Unique identifier for the employee.
- `user_id` (INTEGER REFERENCES users(id)): Foreign key referencing the `users` table.
- `name` (VARCHAR(255) NOT NULL): Name of the employee.
- `email` (VARCHAR(255) UNIQUE NOT NULL): Email of the employee.
- `department_id` (INTEGER REFERENCES departments(id)): Foreign key referencing the `departments` table.
- `hire_date` (DATE NOT NULL): Hire date of the employee.

### `leave_types`
Stores types of leave available.
- `id` (SERIAL PRIMARY KEY): Unique identifier for the leave type.
- `name` (VARCHAR(100) UNIQUE NOT NULL): Name of the leave type.
- `description` (TEXT): Description of the leave type.
- `max_days_per_year` (INTEGER NOT NULL): Maximum number of days allowed per year.

### `leave_requests`
Stores leave requests made by employees.
- `id` (SERIAL PRIMARY KEY): Unique identifier for the leave request.
- `employee_id` (INTEGER REFERENCES employees(id)): Foreign key referencing the `employees` table.
- `start_date` (DATE NOT NULL): Start date of the leave.
- `end_date` (DATE NOT NULL): End date of the leave.
- `leave_type_id` (INTEGER REFERENCES leave_types(id)): Foreign key referencing the `leave_types` table.
- `status` (leave_status NOT NULL DEFAULT 'pending'): Status of the leave request (`pending`, `approved`, or `rejected`).
- `reason` (TEXT): Reason for the leave.
- `requested_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP): Timestamp when the leave request was made.
- `approved_at` (TIMESTAMP): Timestamp when the leave request was approved.
- `rejected_at` (TIMESTAMP): Timestamp when the leave request was rejected.

### `leave_balances`
Stores the balance of leave available to employees.
- `id` (SERIAL PRIMARY KEY): Unique identifier for the leave balance record.
- `employee_id` (INTEGER REFERENCES employees(id)): Foreign key referencing the `employees` table.
- `leave_type_id` (INTEGER REFERENCES leave_types(id)): Foreign key referencing the `leave_types` table.
- `balance` (INTEGER NOT NULL): Number of days available for the leave type.

### `holidays`
Stores information about holidays.
- `id` (SERIAL PRIMARY KEY): Unique identifier for the holiday.
- `date` (DATE NOT NULL): Date of the holiday.
- `name` (VARCHAR(100) NOT NULL): Name of the holiday.
- `description` (TEXT): Description of the holiday.

## ENUM Types

### `leave_status`
Defines the possible statuses of a leave request.
- `pending`: The leave request is pending.
- `approved`: The leave request has been approved.
- `rejected`: The leave request has been rejected.

## Relationships

### `users` to `employees`
- **Relationship Type:** One-to-One
- **Description:** Each user in the `users` table corresponds to exactly one employee in the `employees` table. This is represented by the `user_id` column in the `employees` table, which references the `id` column in the `users` table.

### `departments` to `employees`
- **Relationship Type:** One-to-Many
- **Description:** Each department in the `departments` table can have multiple employees. This is represented by the `department_id` column in the `employees` table, which references the `id` column in the `departments` table.

### `leave_types` to `leave_requests`
- **Relationship Type:** One-to-Many
- **Description:** Each leave type in the `leave_types` table can be associated with multiple leave requests. This is represented by the `leave_type_id` column in the `leave_requests` table, which references the `id` column in the `leave_types` table.

### `employees` to `leave_requests`
- **Relationship Type:** One-to-Many
- **Description:** Each employee in the `employees` table can make multiple leave requests. This is represented by the `employee_id` column in the `leave_requests` table, which references the `id` column in the `employees` table.

### `leave_requests` to `leave_balances`
- **Relationship Type:** Many-to-One
- **Description:** Each leave request in the `leave_requests` table affects the leave balance recorded in the `leave_balances` table. This is indirectly represented by the `employee_id` and `leave_type_id` columns in the `leave_balances` table, which reference the `employees` and `leave_types` tables respectively.

### `employees` to `leave_balances`
- **Relationship Type:** One-to-Many
- **Description:** Each employee in the `employees` table can have multiple leave balances for different types of leave. This is represented by the `employee_id` column in the `leave_balances` table, which references the `id` column in the `employees` table.

## Stored Procedures

### `insert_leave_request`
Inserts a new leave request into the `leave_requests` table.
- **Parameters:**
  - `p_employee_id` (INTEGER): ID of the employee requesting leave.
  - `p_start_date` (DATE): Start date of the leave.
  - `p_end_date` (DATE): End date of the leave.
  - `p_leave_type_id` (INTEGER): ID of the leave type.
  - `p_reason` (TEXT): Reason for the leave.
- **Returns:** Table with the inserted leave request details.

### `update_leave_request_status`
Updates the status of an existing leave request.
- **Parameters:**
  - `p_leave_request_id` (INTEGER): ID of the leave request to update.
  - `p_new_status` (leave_status): New status for the leave request.
- **Returns:** Table with the updated leave request details.

### `decrease_leave_balance`
Decreases the leave balance for an employee.
- **Parameters:**
  - `p_employee_id` (INTEGER): ID of the employee.
  - `p_leave_type_id` (INTEGER): ID of the leave type.
  - `p_days` (INTEGER): Number of days to decrease.
- **Returns:** VOID.

## Usage

1. **Initialize the Database:**
   Run the `createTables` function to create all tables and stored procedures.

2. **Create Admin User:**
   The `createAdminUser` function is called to create an initial admin user.

3. **Insert Initial Data:**
   The `insertLeaveTypes` and `insertDepartments` functions are used to populate initial data.

For further details, refer to the implementation in the `createTables` script.
