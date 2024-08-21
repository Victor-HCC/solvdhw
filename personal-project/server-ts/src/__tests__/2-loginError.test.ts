import request from 'supertest';
import server from '../server'; // Your Express app
import pool from '../db'; // Your PostgreSQL connection

import UserService from '../services/UserService';
jest.mock('../services/UserService.ts');

const baseUrl = '/api/v1';

describe('Login error handling', () => {
  afterAll(async () => {
    await pool.end(); // Close the DB connection after tests
  });
  
  describe('Common Error on the controller', () => {
    it('Should return an error response from the catch block', async () => {
      // Mocking the userService.findUserByUsername to simulate an error
      (UserService.prototype.findUserByUsername as jest.Mock).mockImplementation(() => {
        throw new Error('Database connection failed.');
      });
  
      const res = await request(server)
        .post(`${baseUrl}/login`)
        .send({
          username: 'testadmin@email.com',
          password: 'test123',
        });
  
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'Database connection failed.');
    });
  })

  describe('Login non-standard error handling', () => {
    it('Should handle non-standard errors', async () => {
      // Mocking the userService.findUserByUsername to throw a non-standard error
      (UserService.prototype.findUserByUsername as jest.Mock).mockImplementation(() => {
        // Throwing a string instead of an Error object
        throw 'Unexpected error';
      });
  
      const res = await request(server)
        .post(`${baseUrl}/login`)
        .send({
          username: 'testadmin@email.com',
          password: 'test123',
        });
  
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'An unknown error occurred at login.');
    });
  });
});
