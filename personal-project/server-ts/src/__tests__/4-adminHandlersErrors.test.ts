import request from 'supertest';
import server from '../server'; // Your Express app
import pool from '../db'; // Your PostgreSQL connection

import * as adminControllers from '../controllers/adminControllers'

jest.mock('../controllers/adminControllers.ts')

const baseUrl = '/api/v1';
let token: string;

describe('Admin handlers errors handling', () => {
  afterAll(async () => {
    await pool.end(); // Close the DB connection after tests
  });

  beforeAll(async () => {
    const res = await request(server)
      .post(`${baseUrl}/login`)
      .send({
        username: 'testadmin@email.com',
        password: 'test123',
      });
    token = res.body.token
  })

  describe('Create employee with empty fields', () => {
    it("Shouldn't create any employee", async () => {
      const res = await request(server)
        .post(`${baseUrl}/admin/add-employee`)
        .set('Authorization', token)
        .send({
          name: "", 
          email: "",
          password: "", 
          departmentId: 1
        })
      
      expect(res.statusCode).toEqual(400)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('Some fields are empty.')
    })
  })
  
  describe('Non-standard error handling on creating new employee', () => {
    it('Should handle non-standard errors', async () => {
      // Mocking createUserAndEmployee to throw a non-standard error
      (adminControllers.createUserAndEmployee as jest.Mock).mockImplementation(() => {
        // Throwing a string instead of an Error object
        throw 'Unexpected error';
      });
  
      const res = await request(server)
        .post(`${baseUrl}/admin/add-employee`)
        .set('Authorization', token)
        .send({
          name: "john", 
          email: "john@gmail.com",
          password: "123456", 
          departmentId: 1
        })
  
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'An unknown error occurred at creating new employee.');
    });
  })

  describe('Get employee with none existing id', () => {
    it('Should get employee not found', async () => {
      const res = await request(server)
        .get(`${baseUrl}/admin/employees/${300}`)
        .set('Authorization', token)
      
      expect(res.statusCode).toEqual(404)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toEqual('Employee not found.')
    })
  })

  describe('Error on getting all employees', () => {
    it('Should return an error response from the catch block', async () => {
      // Mocking getAllEmployees to simulate an error
      (adminControllers.getAllEmployees as jest.Mock).mockImplementation(() => {
        throw new Error('Database connection failed.');
      });
  
      const res = await request(server)
        .get(`${baseUrl}/admin/employees`)
        .set('Authorization', token)
  
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'Database connection failed.');
    });
  })

  describe('Non-standard error getting all employees', () => {
    it('Should handle non-standard errors', async () => {
      // Mocking getAllEmployees to throw a non-standard error
      (adminControllers.getAllEmployees as jest.Mock).mockImplementation(() => {
        // Throwing a string instead of an Error object
        throw 'Unexpected error';
      });
  
      const res = await request(server)
        .get(`${baseUrl}/admin/employees`)
        .set('Authorization', token)
  
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'An unknown error occurred at getting all employees.');
    });
  })

  describe('Error on getting leave requests', () => {
    it('Should return an error response from the catch block', async () => {
      // Mocking getAllLeaveRequests to simulate an error
      (adminControllers.getAllLeaveRequests as jest.Mock).mockImplementation(() => {
        throw new Error('Database connection failed.');
      });
  
      const res = await request(server)
        .get(`${baseUrl}/admin/leave-requests`)
        .set('Authorization', token)
  
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'Database connection failed.');
    });
  })

  describe('Non-standard error getting all leave requests', () => {
    it('Should handle non-standard errors', async () => {
      // Mocking getAllLeaveRequests to throw a non-standard error
      (adminControllers.getAllLeaveRequests as jest.Mock).mockImplementation(() => {
        // Throwing a string instead of an Error object
        throw 'Unexpected error';
      });
  
      const res = await request(server)
        .get(`${baseUrl}/admin/leave-requests`)
        .set('Authorization', token)
  
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'An unknown error occurred at getting all leave requests.');
    });
  })

  describe('Error on update leave request', () => {
    it('Should return an error response from the catch block', async () => {
      // Mocking updateLeaveRequest to simulate an error
      (adminControllers.updateLeaveRequest as jest.Mock).mockImplementation(() => {
        throw new Error('Database connection failed.');
      });
  
      const res = await request(server)
        .patch(`${baseUrl}/admin/leave-requests/1`)
        .set('Authorization', token)
  
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'Database connection failed.');
    });
  })

  describe('Non-standard error on update leave request', () => {
    it('Should handle non-standard errors', async () => {
      // Mocking updateLeaveRequest to throw a non-standard error
      (adminControllers.updateLeaveRequest as jest.Mock).mockImplementation(() => {
        // Throwing a string instead of an Error object
        throw 'Unexpected error';
      });
  
      const res = await request(server)
        .patch(`${baseUrl}/admin/leave-requests/1`)
        .set('Authorization', token)
  
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'An unknown error occurred at updating the leave request.');
    });
  })

});
