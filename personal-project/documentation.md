# Employee Leave Management API

## Table of Contents

1. [Description](#description)
2. [Technical requirements](#technical-requirements)
3. [Base URL](#base-url)
4. [API Documentation](#api-documentation)
-    4.1. [Login Endpoint](#login-endpoint)
-    4.2. [Employee Endpoints](#employee-endpoints)
-    4.3. [Admin Endpoints](#admin-endpoints)
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
  "message": "Logged in",
  "token": "token"

}
```
### Employee Endpoints
### api/v1/employee/leave-balance/:employeeId

- GET `api/v1/employee/leave-balance/:employeeId` - get leave balance for the logged-in employee.
  -  Server should answer with response 200 and the information of the leave balance.
#### Example of response

```json
[
  {
    "id": 57,
    "employeeId": 9,
    "leaveTypeId": 1,
    "nameLeaveType": "Vacation Leave",
    "balance": 15
  },
  {
    "id": 58,
    "employeeId": 9,
    "leaveTypeId": 2,
    "nameLeaveType": "Sick Leave",
    "balance": 10
  },
  ...
]
```

### api/v1/employee/leave-request

- POST `api/v1/employee/leave-request` - Request leave.
  -  Server should answer with response 201 and newly created record.

#### Example of request
```json
{
  "employeeId": "9", // Id of the employee
  "startDate": "2024-08-22", // Start date of the leave
  "endDate": "2024-08-26", // End date of the leave
  "leaveTypeId": "1", // Id of the leave type
  "reason": "Vacations" // Reason for the leave request
}
```
#### Response
```json
{
  "id": 16, // Id of the leave request
  "employeeId": 9, // Id of the employee
  "startDate": "2024-08-22T03:00:00.000Z", // Start date of the leave
  "endDate": "2024-08-26T03:00:00.000Z", // End date of the leave
  "leaveTypeId": 1, // Id of the leave type
  "status": "pending", // Status of the request
  "reason": "Vacations", // Reason for the leave request
  "requestedAt": "2024-08-05T00:23:58.616Z", // Date of the application of leave request
  "approvedAt": null, 
  "rejectedAt": null
}
```

### api/v1/employee/leave-history/:employeeId

- GET `/api/v1/employee/leave-history/:employeeId` - Get leave history for the logged-in employee.
  -  Server should answer with response 200 and the leave history records.

#### Response
```json
{
  "employeeId": "9",
  "leaveHistory": [
    {
      "id": 16,
      "leaveTypeId": 1,
      "nameLeaveType": "Vacation Leave",
      "startDate": "2024-08-22T03:00:00.000Z",
      "endDate": "2024-08-26T03:00:00.000Z",
      "status": "approved",
      "reason": "Vacations",
      "requestedAt": "2024-08-05T00:23:58.616Z",
      "approvedAt": "2024-08-06T21:53:21.785Z",
      "rejectedAt": null
    },
    {
      "id": 17,
      "leaveTypeId": 1,
      "nameLeaveType": "Vacation Leave",
      "startDate": "2024-09-02T03:00:00.000Z",
      "endDate": "2024-09-04T03:00:00.000Z",
      "status": "pending",
      "reason": "Vacations again",
      "requestedAt": "2024-08-06T21:07:39.744Z",
      "approvedAt": null,
      "rejectedAt": null
    }
  ]
}

```

### Admin Endpoints

### /api/v1/admin/add-employee

- POST `/api/v1/admin/add-employee` - Adds a new employee.
  -  Server should answer with response 201 and the new employee created.

#### Example of request
```json
{
  "name": "John", // Name of the employee
  "email": "john@gmail.com", // Email of the employee
  "password": "123456", // Password for the employee (will be hashed before saving on the db)
  "departmentId": "1" // Id of the department of the employee
}
```
#### Response
```json
{
  "id": 1,
  "name": "John",
  "email": "john@gmail.com",
  "departmentId": 1,
  "userId": 1,
  "hireDate": "2024-08-04T03:00:00.000Z"
}
```

### /api/v1/admin/delete-employee/:employeeId

- DELETE `/api/v1/admin/delete-employee/:employeeId` - Soft delete an employee.
  -  Server should answer with response 200 and a success message.
  -  The employee will be marked as inactive, preventing them from logging in, but their records will remain in the database.
#### Response
```json
{
  "message": "Employee deleted successfully."
}
```

### /api/v1/admin/employees

- GET `/api/v1/admin/employees` - Get all active employees.
  -  Server should answer with response 200 and the list of employees.

#### Response
```json
{
  "employees": [
    {
      "id": 1,
      "name": "john",
      "email": "john@gmail.com",
      "departmentId": 1,
      "userId": 2,
      "hireDate": "2024-08-08T03:00:00.000Z"
    },
    {
      "id": 3,
      "name": "john2",
      "email": "john2@gmail.com",
      "departmentId": 1,
      "userId": 4,
      "hireDate": "2024-08-08T03:00:00.000Z"
    },
    {
      "id": 4,
      "name": "john3",
      "email": "john3@gmail.com",
      "departmentId": 1,
      "userId": 5,
      "hireDate": "2024-08-08T03:00:00.000Z"
    }
  ],
  "totalCount": 3
}
```

### /api/v1/admin/leave-requests

- GET `/api/v1/admin/leave-requests?page=#&limit=#` - Get all leave requests.
  -  Server should answer with response 200 and the list of requests.
  -  Query parameters:
     -  `page`: Specifies the page number of results to retrieve.
     -  `limit`: Specifies the number of requests per page.
#### Response
```json
{
  "leaveRequests": [
    {
      "id": 6,
      "employeeId": 1,
      "startDate": "2024-09-09T03:00:00.000Z",
      "endDate": "2024-09-10T03:00:00.000Z",
      "leaveTypeId": 1,
      "status": "approved",
      "reason": "Vacations",
      "requestedAt": "2024-08-01T19:02:58.646Z",
      "approvedAt": "2024-08-04T23:24:24.388Z",
      "rejectedAt": null
    },
    // More leave requests
  ],
  "totalCount": 15,
  "page": 1,
  "limit": 10
}
```

### /api/v1/admin/leave-requests/:id

- POST `/api/v1/admin/leave-requests/:id` - Approve or reject a leave request.
  -  Server should answer with response 200 and the the updated leave request.

#### Example of request
```json
{
  "status": "approved" // approved o rejected status
}
```
#### Response
```json
{
  "id": 7,
  "employeeId": 2,
  "startDate": "2024-09-09T03:00:00.000Z",
  "endDate": "2024-09-10T03:00:00.000Z",
  "leaveTypeId": 1,
  "status": "approved",
  "reason": "Vacations",
  "requestedAt": "2024-08-01T19:03:01.897Z",
  "approvedAt": "2024-08-05T00:20:59.384Z",
  "rejectedAt": null
}
```

### /api/v1/admin/leave-requests/status/:status

- GET `/api/v1/admin/leave-requests/status/:status` - Get requests by status ('approved', 'rejected', 'pending').
  -  Server should answer with response 200 and the list of requests.
#### Response
```json
[
  {
    "id": 2,
    "employeeId": 2,
    "startDate": "2024-08-22T03:00:00.000Z",
    "endDate": "2024-08-26T03:00:00.000Z",
    "leaveTypeId": 1,
    "status": "pending",
    "reason": "Vacations",
    "requestedAt": "2024-08-01T19:02:10.283Z",
    "approvedAt": null,
    "rejectedAt": null
  },
  {
    "id": 3,
    "employeeId": 3,
    "startDate": "2024-08-22T03:00:00.000Z",
    "endDate": "2024-08-26T03:00:00.000Z",
    "leaveTypeId": 1,
    "status": "pending",
    "reason": "Vacations",
    "requestedAt": "2024-08-01T19:02:15.768Z",
    "approvedAt": null,
    "rejectedAt": null
  },
  // More results with the same status
]
```

## Install & Run

```
  docker compose up --build
```