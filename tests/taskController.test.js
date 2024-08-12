const request = require('supertest');
const app = require('../src/index');
const Task = require('../src/database/models/Task');
const baseController = require('../src/controllers/baseController');

jest.mock('../src/database/models/Task');
jest.mock('../src/database/models/User');

describe('Task Controller', () => {
  let token;

  beforeEach(() => {
    jest.resetAllMocks();
    token = 'mockToken';
  });

  it('should create a new task', async () => {
    const user = { id: 1 };
    const taskData = {
      description: 'Test Task',
      priority: 'Alta',
    };

    User.findOne.mockResolvedValue(user);
    Task.create.mockResolvedValue({ ...taskData, user_id: user.id });

    const response = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send(taskData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('description', taskData.description);
  });

  it('should list pending tasks', async () => {
    const user = { id: 1 };
    const tasks = [
      { description: 'Test Task', priority: 'Alta', status: 'pending' },
    ];

    User.findOne.mockResolvedValue(user);
    Task.findAll.mockResolvedValue(tasks);

    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty('description', 'Test Task');
  });

  it('should return 404 if no tasks found', async () => {
    const user = { id: 1 };

    User.findOne.mockResolvedValue(user);
    Task.findAll.mockResolvedValue([]);

    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
  });
});
