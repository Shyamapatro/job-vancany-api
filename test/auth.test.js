
import request from 'supertest';
import app from '../server';  
import User from '../app/models/user' 
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
import { connectDB, disconnectDB } from '../dbConnection';
// eslint-disable-next-line no-undef
jest.mock('../app/models/user'); 
// eslint-disable-next-line no-undef 
jest.mock('bcryptjs');  
// eslint-disable-next-line no-undef         
jest.mock('jsonwebtoken');  
// eslint-disable-next-line no-undef
beforeAll(async () => {
  try {
    await connectDB();  
  } catch (error) {
    console.log("Error connecting to the database:", error);
  }
});
// eslint-disable-next-line no-undef
afterAll(async () => {
  try {
    await disconnectDB(); 
  } catch (error) {
     console.log("Error disconnecting from the database:", error);
  }
});
// eslint-disable-next-line no-undef
describe('POST /login', () => {
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    // eslint-disable-next-line no-undef
    jest.clearAllMocks();
  });
  // eslint-disable-next-line no-undef
  test('should return 400 if email or password is missing', async () => {
    const response = await request(app)
      .post('/api/user/login')
      .send({ email: '' });
    // eslint-disable-next-line no-undef
    expect(response.status).toBe(400);
    // eslint-disable-next-line no-undef
    expect(response.body.message).toBe('Validation failed');
  });
  // eslint-disable-next-line no-undef
  test('should return 404 if user is not found', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    // eslint-disable-next-line no-undef
    User.findOne = jest.fn().mockResolvedValue(null);
    const response = await request(app)
      .post('/api/user/login')
      .send({ email, password });
    // eslint-disable-next-line no-undef
    expect(response.status).toBe(404);
    // eslint-disable-next-line no-undef
    expect(response.body.message).toBe('Incorrect email or password. Please try again.');
  });

  
});
