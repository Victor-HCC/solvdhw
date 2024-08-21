import request from 'supertest';
import server from '../server'; // Your Express app
import pool from '../db'; // Your PostgreSQL connection

let tokenAdmin: string; //Variable to store the token
let tokenEmployee: string; 
const baseUrl = '/api/v1'
let employeeId: number;
let balance: number
let idRequest: number

describe('API test', () => {
  afterAll(async () => {
    await pool.end(); // Close the DB connection after tests
  });

  describe('Test admin', () => {
    describe('Admin login with wrong user', () => {
      it("Shouldn't login admin", async () => {
        const res = await request(server)
          .post(`${baseUrl}/login`)
          .send({
            username: 'testemployee@email.com',
            password: 'test123',
          });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Invalid credentials.');
      });
    })

    describe('Admin login with wrong password', () => {
      it("Shouldn't login admin", async () => {
        const res = await request(server)
          .post(`${baseUrl}/login`)
          .send({
            username: 'testadmin@email.com',
            password: '111111',
          });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Invalid credentials.');
      });
    })

    describe('Admin login with correct credentials', () => {
      it('Should login admin', async () => {
        const res = await request(server)
          .post(`${baseUrl}/login`)
          .send({
            username: 'testadmin@email.com',
            password: 'test123',
          });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        tokenAdmin = res.body.token
      });
    })
  
    describe('Access to protected endpoint without token', () => {
      it("Shouldn't access to the endpoint", async () => {
        const res = await request(server)
          .post(`${baseUrl}/admin/add-employee`)
          .send({
            name: "Susan", 
            email: "susan@gmail.com", 
            password: "123456", 
            departmentId: 1
          })
        
        expect(res.statusCode).toEqual(401)
        expect(res.body.message).toEqual('Access Denied.')
      })
    })

    describe('Access to protected endpoint with wrong token', () => {
      it("Shouldn't access to the endpoint", async () => {
        const res = await request(server)
          .post(`${baseUrl}/admin/add-employee`)
          .set('Authorization', `${tokenAdmin}abc`)
          .send({
            name: "Susan", 
            email: "susan@gmail.com", 
            password: "123456", 
            departmentId: 1
          })
        
        expect(res.statusCode).toEqual(400)
        expect(res.body.message).toEqual('Invalid Token.')
      })
    })

    describe('Create employee', () => {
      it('Should create new employee', async () => {
        const res = await request(server)
          .post(`${baseUrl}/admin/add-employee`)
          .set('Authorization', tokenAdmin)
          .send({
            name: "Susan", 
            email: "susan@gmail.com", 
            password: "123456", 
            departmentId: 1
          })
        
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('id')
        expect(res.body.email).toEqual('susan@gmail.com')
        employeeId = parseInt(res.body.id)
      })
    })

    describe('Create duplicate employee', () => {
      it("Shouldn't create duplicate employee", async () => {
        const res = await request(server)
          .post(`${baseUrl}/admin/add-employee`)
          .set('Authorization', tokenAdmin)
          .send({
            name: "Susan", 
            email: "susan@gmail.com", 
            password: "123456", 
            departmentId: 1
          })
        
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('error')
      })
    })

    describe('Get employees', () => {
      it('Should get all employees', async () => {
        const res = await request(server)
          .get(`${baseUrl}/admin/employees`)
          .set('Authorization', tokenAdmin)
        
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('employees')
        expect(res.body.totalCount).toEqual(1)
      })
    })

    describe('Get employee', () => {
      it('Should get an employee by id', async () => {
        const res = await request(server)
          .get(`${baseUrl}/admin/employees/${employeeId}`)
          .set('Authorization', tokenAdmin)
        
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('id')
        expect(res.body.name).toEqual('Susan')
      })
    })
  })

  describe('Test employee', () => {
    describe('Login employee', () => {
      it('Should login employee', async () => {
        const res = await request(server)
          .post(`${baseUrl}/login`)
          .send({
            username: 'susan@gmail.com',
            password: '123456'
          })
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        tokenEmployee = res.body.token
      })
    })

    describe('Access to admin endpoint', () => {
      it("Shouldn't get access to the endpoint", async () => {
        const res = await request(server)
          .get(`${baseUrl}/admin/employees`)
          .set('Authorization', tokenEmployee)

        expect(res.statusCode).toEqual(403)
        expect(res.body.message).toEqual("You don't have access to this resource.")
      })
    })

    describe('Get leave balance', () => {
      it('Should get the leave balance for the employee by id', async () => {
        const res = await request(server)
          .get(`${baseUrl}/employee/leave-balance/${employeeId}`)
          .set('Authorization', tokenEmployee)
        expect(res.statusCode).toEqual(200)
        expect(Array.isArray(res.body)).toBe(true)

        if(res.body.length > 0) {
          const leaveBalance = res.body[0];
          expect(leaveBalance).toHaveProperty('id');
          expect(leaveBalance).toHaveProperty('employeeId');
          expect(leaveBalance).toHaveProperty('leaveTypeId');
          expect(leaveBalance).toHaveProperty('nameLeaveType');
          expect(leaveBalance).toHaveProperty('balance');
          balance = leaveBalance.balance
        }
      })
    })

    describe('Get leave balance with non existent employee id', () => {
      it("Should get empty leave balance", async () => {
        const res = await request(server)
          .get(`${baseUrl}/employee/leave-balance/${200}`)
          .set('Authorization', tokenEmployee)
        expect(res.statusCode).toEqual(200)
        expect(Array.isArray(res.body)).toBe(true)
        expect(res.body).toEqual([])
      })
    })

    describe('Get leave balance with wrong id', () => {
      it("Shouldn't get the leave balance for the employee", async () => {
        const res = await request(server)
          .get(`${baseUrl}/employee/leave-balance/id`)
          .set('Authorization', tokenEmployee)
        expect(res.statusCode).toEqual(400)
        expect(res.body.error).toEqual('Invalid employee ID provided.')
      })
    })

    describe('Create leave request', () => {
      it('Should create a new leave request for the employee id', async () => {
        const res = await request(server)
          .post(`${baseUrl}/employee/leave-request/${employeeId}`)
          .set('Authorization', tokenEmployee)
          .send({
            startDate: "2024-09-16",
            endDate: "2024-09-20",
            leaveTypeId: 1,
            reason: "Vacations"
          })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('id')
        idRequest = res.body.id
      })
    })

    describe('Create leave request with wrong id', () => {
      it("Shouldn't create a new leave request", async () => {
        const res = await request(server)
          .post(`${baseUrl}/employee/leave-request/id`)
          .set('Authorization', tokenEmployee)
          .send({
            startDate: "2024-09-16",
            endDate: "2024-09-20",
            leaveTypeId: 1,
            reason: "Vacations"
          })
        expect(res.statusCode).toEqual(400)
        expect(res.body.error).toEqual('Invalid employee ID provided.')
      })
    })

    describe('Get leave history', () => {
      it('Should get the leave history for the employee id', async () => {
        const res = await request(server)
          .get(`${baseUrl}/employee/leave-history/${employeeId}`)
          .set('Authorization', tokenEmployee)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('leaveHistory')
        expect(res.body.employeeId).toEqual(employeeId)
      })
    })

    describe('Get leave history with wrong id', () => {
      it("Shouldn't get the leave history for the employee", async () => {
        const res = await request(server)
          .get(`${baseUrl}/employee/leave-history/id`)
          .set('Authorization', tokenEmployee)
        expect(res.statusCode).toEqual(400)
        expect(res.body.error).toEqual('Invalid employee ID provided.')
      })
    })
  })

  describe('Admin Test', () => {
    describe('Get leave requests', () => {
      it('Should get a list of leave request', async () => {
        const res = await request(server)
          .get(`${baseUrl}/admin/leave-requests`)
          .set('Authorization', tokenAdmin)
        
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('leaveRequests')
        expect(res.body.totalCount).toEqual(1)
      })
    })

    describe('Approve a request', () => {
      it('Should approve a leave request by id', async () => {
        const res = await request(server)
          .patch(`${baseUrl}/admin/leave-requests/${idRequest}`)
          .set('Authorization', tokenAdmin)
          .send({
            status: 'approved'
          })
        expect(res.statusCode).toEqual(200)
        expect(res.body.id).toEqual(idRequest)
        expect(res.body.status).toEqual('approved')
      })
    })

    describe('Get requests by status', () => {
      it('Should get all the request with the given status', async () => {
        const res = await request(server)
          .get(`${baseUrl}/admin/leave-requests/status/approved`)
          .set('Authorization', tokenAdmin)
        expect(res.statusCode).toEqual(200)
        expect(Array.isArray(res.body)).toBe(true)

        if(res.body.length > 0) {
          const leaveRequest = res.body[0];
          expect(leaveRequest).toHaveProperty('id');
          expect(leaveRequest).toHaveProperty('employeeId');
          expect(leaveRequest).toHaveProperty('startDate');
          expect(leaveRequest.status).toEqual('approved');
        }
      })
    })

    describe('Get requests by status when there is none', () => {
      it('Should get an empty array', async () => {
        const res = await request(server)
          .get(`${baseUrl}/admin/leave-requests/status/rejected`)
          .set('Authorization', tokenAdmin)
        expect(res.statusCode).toEqual(200)
        expect(Array.isArray(res.body)).toBe(true)
        expect(res.body.length).toEqual(0)
      })
    })

    describe('Delete an employee', () => {
      it('Should delete an employee by id', async () => {
        const res = await request(server)
          .delete(`${baseUrl}/admin/delete-employee/${employeeId}`)
          .set('Authorization', tokenAdmin)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Employee deleted successfully.')
      })
    })

    describe('Delete an employee with non existing id', () => {
      it('Should get a message for the non existing employee', async () => {
        const res = await request(server)
          .delete(`${baseUrl}/admin/delete-employee/${230}`)
          .set('Authorization', tokenAdmin)
        expect(res.statusCode).toEqual(404)
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Employee not found.')
      })
    })
  })


});

