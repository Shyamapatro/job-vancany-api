
import request from 'supertest';
import app from '../server';  
import User from '../app/models/user' 
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connectDB, disconnectDB } from '../dbConnection';
import { info } from '../app/utils/logger';
// eslint-disable-next-line no-undef
jest.mock('../app/models/user'); 
// eslint-disable-next-line no-undef 
jest.mock('bcryptjs');  
// eslint-disable-next-line no-undef         
jest.mock('jsonwebtoken');  
// eslint-disable-next-line no-undef

jest.setTimeout(10000);
beforeAll(async () => {
  try {
    await connectDB();  
  } catch (error) {
    info("Error connecting to the database:", error);
  }
});
// eslint-disable-next-line no-undef
afterAll(async () => {
  try {
    setTimeout(async () => {
      await disconnectDB();
    }, 5000);
    
  } catch (error) {
    info("Error disconnecting from the database:", error);
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


  test('should return 200 and a token if login is successful', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const user = { id: 1, email, password: 'hashedPassword' };
    const token = 'mockedToken';

    User.findOne.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue(token);

    const response = await request(app)
      .post('/api/user/login')
      .send({ email, password });
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful!');
    expect(response.body.token).toBe(token);
  });

  test('should return 500 if an error occurs during login', async () => {
    User.findOne.mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .post('/api/user/login')
      .send({ email: 'test@example.com', password: 'password123' });
    
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('An error occurred during login. Please try again later.');
    expect(response.body.error).toBe('Database error');
  });
  
});


describe('POST /register', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mock calls
  });

  test('should return 400 if username, email, or password is missing', async () => {
    const response = await request(app)
      .post('/api/user/register')
      .send({ email: 'test@example.com', password: 'password123' }); // Missing username

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Validation failed');
  });

  test('should return 400 if email format is invalid', async () => {
    const response = await request(app)
      .post('/api/user/register')
      .send({ username: 'testuser', email: 'invalid-email', password: 'password123' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Validation failed');
  });

  test('should return 400 if email is already registered', async () => {
    User.findOne.mockResolvedValue({ email: 'test@example.com' }); // Mock existing user with same email

    const response = await request(app)
      .post('/api/user/register')
      .send({ username: 'newuser', email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email is already registered');
  });

  test('should return 400 if username is already taken', async () => {
    User.findOne.mockResolvedValue({ username: 'testuser' }); // Mock existing user with same username

    const response = await request(app)
      .post('/api/user/register')
      .send({ username: 'testuser', email: 'newemail@example.com', password: 'password123' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Username is already taken');
  });

  test('should return 201 and register user if data is valid', async () => {
    User.findOne.mockResolvedValue(null); // No existing user
    bcrypt.hash.mockResolvedValue('hashedPassword'); // Mock password hashing
    User.create.mockResolvedValue({
      id: 1,
      username: 'testuser',
      email: 'test@example.com'
    });

    const response = await request(app)
      .post('/api/user/register')
      .send({ username: 'testuser', email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
    expect(response.body.user).toEqual({
      id: 1,
      username: 'testuser',
      email: 'test@example.com'
    });
  });

 
});