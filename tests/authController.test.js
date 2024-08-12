const request = require('supertest');
const app = require('../src/index');
const User = require('../src/database/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../src/database/models/User');

describe('Auth Controller', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should register a new user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    };

    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({
      ...userData,
      id: 1,
      temptoken: 'hashedToken',
    });

    const response = await request(app).post('/api/register').send(userData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should login an existing user', async () => {
    const user = {
      email: 'test@example.com',
      password: 'hashedPassword',
      name: 'Test User',
    };

    User.findOne.mockResolvedValue(user);
    jest.spyOn(jwt, 'sign').mockReturnValue('mockToken');

    const response = await request(app).post('/api/login').send({
      email: user.email,
      password: 'password123',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('name', user.name);
    expect(response.body).toHaveProperty('email', user.email);
  });
});
