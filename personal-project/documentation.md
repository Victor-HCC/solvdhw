# Employee Leave Management API

## Table of Contents

1. [Description](#description)
2. [Technical requirements](#technical-requirements)
3. [Base URL](#base-url)
4. [API Documentation](#api-documentation)
-    4.1. [Login Endpoint](#login-endpoint)
-    4.2. [Employee Endpoints](#employee-endpoints)
-    4.3. [Manager Endpoints](#manager-endpoints)
-    4.4. [Admin Endpoints](#admin-endpoints)
5. [Install](#install)
6. [Run](#run)

## Description

The Employee Leave Management System (ELMS) allows employees to request leave, view leave balances, and track their leave history. Managers can approve or reject leave requests and generate reports. The system calculates available leave days and any corresponding payouts based on company policies.


## Technical requirements

- Programming language - Javascript
- Database - PostgreSQL
- Docker

## Base URL

http://localhost:3001

## API Documentation

### Login Endpoint

### api/v1/login

-  **Request**
```bash
curl -X 'POST' \\
  '/login' \\
  -d '{
    "username": "username",
    "password": "password"
  }'
```
-  **Response**
```bash
{
  "username": "username"
}
```
### Employee Endpoints
### api/v1/employee/leave-balance

- GET `api/v1/employee/leave-balance` - get leave balance for the logged-in employee.
  -  Server should answer with response 200 and the information of the leave balance.
#### Example of response

```json
{
  "employeeId": 123,
  "name": "John Doe",
  "annualLeaveDays": 10.25,
  "sickLeaveDays": 5.0,
  "unpaidLeaveDays": 0.0,
  "lastAccrualDate": "2024-05-01"
}
```

### api/v1/employee/request-leave

- POST `api/v1/employee/request-leave` - Request leave.
  -  Server should answer with response 201 and newly created record.

#### Example of request
```json
{
  "leaveType": "annual",  // Type of leave: "annual", "sick", or "unpaid"
  "startDate": "2024-06-10",  // Start date of the leave
  "endDate": "2024-06-14",    // End date of the leave
  "reason": "Family vacation" // Reason for the leave request
}
```
#### Response
```json
{
  "message": "Leave request submitted successfully",
  "requestId": 456
}
```

### api/v1/employee/leave-history

- GET `/api/v1/employee/leave-history` - Get leave history for the logged-in employee.
  -  Server should answer with response 200 and the leave history records.

#### Response
```json
{
  "employeeId": 123,
  "leaveHistory": [
    {
      "requestId": 101,
      "leaveType": "annual",
      "startDate": "2024-01-10",
      "endDate": "2024-01-15",
      "reason": "New Year vacation",
      "status": "Approved"
    },
    {
      "requestId": 102,
      "leaveType": "sick",
      "startDate": "2024-03-05",
      "endDate": "2024-03-08",
      "reason": "Flu",
      "status": "Approved"
    }
  ]
}

```

### Manager Endpoints

### /api/v1/manager/pending-requests

- GET `/api/v1/manager/pending-requests` - Get all pending leave requests for approval.
  -  Server should answer with response 200 and the list of pending requests.

#### Response
```json
{
  "pendingRequests": [
    {
      "requestId": 103,
      "employeeId": 124,
      "employeeName": "Jane Smith",
      "leaveType": "annual",
      "startDate": "2024-07-01",
      "endDate": "2024-07-10",
      "reason": "Summer vacation",
      "status": "Pending"
    },
    {
      "requestId": 104,
      "employeeId": 125,
      "employeeName": "Bob Johnson",
      "leaveType": "sick",
      "startDate": "2024-07-05",
      "endDate": "2024-07-08",
      "reason": "Medical procedure",
      "status": "Pending"
    }
  ]
}
```

### /api/v1/manager/approve-leave/:id

- POST `/api/v1/manager/approve-leave/:id` - Approve a leave request.
  -  Server should answer with response 200 and the the updated leave request.

#### Response
```json
{
  "message": "Leave request approved successfully",
  "requestId": 103,
  "status": "Approved"
}
```
### /api/v1/manager/reject-leave/:id

- POST `/api/v1/manager/reject-leave/:id` - Reject a leave request.
  -  Server should answer with response 200 and the the updated leave request.

#### Response
```json
{
  "message": "Leave request rejected successfully",
  "requestId": 103,
  "status": "Rejected"
}
```

### Admin Endpoints

### /api/v1/admin/add-employee

- POST `/api/v1/admin/add-employee`- Add a new employee.
  -  Server should answer with response 201 and the newly created employee record.

#### Example of request
```json
{
  "name": "Alice Johnson",
  "email": "alice.johnson@example.com",
  "position": "Software Engineer",
  "annualLeaveDays": 0,
  "sickLeaveDays": 0,
  "unpaidLeaveDays": 0
}
```

#### Response
```json
{
  "message": "Employee added successfully",
  "employee": {
    "employeeId": 126,
    "name": "Alice Johnson",
    "email": "alice.johnson@example.com",
    "position": "Software Engineer",
    "annualLeaveDays": 0,
    "sickLeaveDays": 0,
    "unpaidLeaveDays": 0
  }
}
```

### /api/v1/admin/edit-employee/:id

- PUT `/api/v1/admin/edit-employee/:id`- Edit employee details.
  -  Server should answer with response 200 and the updated employee record.

#### Example of request
```json
{
  "name": "Alice Johnson",
  "email": "alice.j@example.com",
  "position": "Senior Software Engineer",
  "annualLeaveDays": 20,
  "sickLeaveDays": 12,
  "unpaidLeaveDays": 0
}
```

#### Response
```json
{
  "message": "Employee details updated successfully",
  "employee": {
    "employeeId": 126,
    "name": "Alice Johnson",
    "email": "alice.j@example.com",
    "position": "Senior Software Engineer",
    "annualLeaveDays": 20,
    "sickLeaveDays": 12,
    "unpaidLeaveDays": 0
  }
}
```

### /api/v1/admin/delete-employee/:id

- DELETE `/api/v1/admin/delete-employee/:id`- Delete an employee.
  -  Server should answer with response 200 and a confirmation message.

#### Response
```json
{
  "message": "Employee deleted successfully",
  "employeeId": 126
}
```

### /api/admin/set-leave-policy

- POST `/api/admin/set-leave-policy`- Define leave policies.
  -  Server should answer with response 201 and the newly set leave policy.

#### Example of request
```json
{
  "annualLeaveDays": 20,
  "sickLeaveDays": 10,
  "unpaidLeaveDays": 5
}
```

#### Response
```json
{
  "message": "Leave policy set successfully",
  "leavePolicy": {
    "annualLeaveDays": 20,
    "sickLeaveDays": 10,
    "unpaidLeaveDays": 5
  }
}
```

### /api/v1/admin/employee-leave-summary

- GET `/api/v1/admin/employee-leave-summary` - Get a summary of leave balances for all employees.
  -  Server should answer with response 200 and the summary of leave balances.

#### Response
```json
{
  "leaveSummary": [
    {
      "employeeId": 123,
      "employeeName": "John Doe",
      "annualLeaveDays": 10.25,
      "sickLeaveDays": 5.0,
      "unpaidLeaveDays": 0.0
    },
    {
      "employeeId": 124,
      "employeeName": "Jane Smith",
      "annualLeaveDays": 15.5,
      "sickLeaveDays": 3.0,
      "unpaidLeaveDays": 2.0
    }
  ]
}
```

### /api/v1/admin/update-leave-balance/:id

- POST `/api/v1/admin/update-leave-balance/:id`- Update the leave balance for a specific employee.
  -  Server should answer with response 200 and the updated leave balance.

#### Example of request
```json
{
  "annualLeaveDays": 12.5,
  "sickLeaveDays": 6.0,
  "unpaidLeaveDays": 1.0
}
```

#### Response
```json
{
  "message": "Leave balance updated successfully",
  "employeeId": 123,
  "annualLeaveDays": 12.5,
  "sickLeaveDays": 6.0,
  "unpaidLeaveDays": 1.0
}
```

## Install

## Run