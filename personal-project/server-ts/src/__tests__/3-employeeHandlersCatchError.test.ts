import request from 'supertest';
import server from '../server'; // Your Express app
import pool from '../db'; // Your PostgreSQL connection

import * as employeeControllers from '../controllers/employeeControllers'

jest.mock('../controllers/employeeControllers.ts')

const baseUrl = '/api/v1';
let token: string

describe('Employee handlers error handling', () => {
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
  
  describe('Error on getting leave balance', () => {
    it('Should return an error response from the catch block', async () => {
      // Mocking getLeaveBalanceByEmployeeId to simulate an error
      (employeeControllers.getLeaveBalanceByEmployeeId as jest.Mock).mockImplementation(() => {
        throw new Error('Database connection failed.');
      });
  
      const res = await request(server)
        .get(`${baseUrl}/employee/leave-balance/1`)
        .set('Authorization', token)
  
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'Database connection failed.');
    });
  })

  describe('Non-standard error handling on getting leave balance', () => {
    it('Should handle non-standard errors', async () => {
      // Mocking getLeaveBalanceByEmployeeId to throw a non-standard error
      (employeeControllers.getLeaveBalanceByEmployeeId as jest.Mock).mockImplementation(() => {
        // Throwing a string instead of an Error object
        throw 'Unexpected error';
      });
  
      const res = await request(server)
        .get(`${baseUrl}/employee/leave-balance/1`)
        .set('Authorization', token)
  
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'An unknown error occurred at getting the leave balance.');
    });
  });

  describe('Error on createLeaveRequest', () => {
    it('Should return an error response from the catch block', async () => {
      // Mocking createLeaveRequest to simulate an error
      (employeeControllers.createLeaveRequest as jest.Mock).mockImplementation(() => {
        throw new Error('Database connection failed.');
      });
  
      const res = await request(server)
        .post(`${baseUrl}/employee/leave-request/1`)
        .set('Authorization', token)
  
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'Database connection failed.');
    });
  })

  describe('Non-standard error handling on createLeaveRequest', () => {
    it('Should handle non-standard errors', async () => {
      // Mocking createLeaveRequest to throw a non-standard error
      (employeeControllers.createLeaveRequest as jest.Mock).mockImplementation(() => {
        // Throwing a string instead of an Error object
        throw 'Unexpected error';
      });
  
      const res = await request(server)
        .post(`${baseUrl}/employee/leave-request/1`)
        .set('Authorization', token)
  
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'An unknown error occurred at creating the leave request.');
    });
  });

  describe('Error on getLeaveHistoryByEmployeeId', () => {
    it('Should return an error response from the catch block', async () => {
      // Mocking getLeaveHistoryByEmployeeId to simulate an error
      (employeeControllers.getLeaveHistoryByEmployeeId as jest.Mock).mockImplementation(() => {
        throw new Error('Database connection failed.');
      });
  
      const res = await request(server)
        .get(`${baseUrl}/employee/leave-history/1`)
        .set('Authorization', token)
  
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'Database connection failed.');
    });
  })

  describe('Non-standard error handling on getLeaveHistoryByEmployeeId', () => {
    it('Should handle non-standard errors', async () => {
      // Mocking getLeaveHistoryByEmployeeId to throw a non-standard error
      (employeeControllers.getLeaveHistoryByEmployeeId as jest.Mock).mockImplementation(() => {
        // Throwing a string instead of an Error object
        throw 'Unexpected error';
      });
  
      const res = await request(server)
        .get(`${baseUrl}/employee/leave-history/1`)
        .set('Authorization', token)
  
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'An unknown error occurred at getting the leave request history.');
    });
  });
});
