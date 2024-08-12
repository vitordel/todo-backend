const Task = require('../database/models/Task');
const baseController = require('./baseController');

const createTask = async (req, res) => {
  const { description, priority } = req.body;
  const user = req.user;

  try {
    if (!user || !user.id) {
      return baseController.unauthorized(res);
    }

    const task = await Task.create({ description, priority, user_id: user.id });
    return baseController.success(res, task);
  } catch (e) {
    console.error('Erro ao criar tarefa:', e);
    return baseController.error(res, 'Erro ao criar tarefa');
  }
};

const listPendingTasks = async (req, res) => {
  const user = req.user;

  try {
    if (!user || !user.id) {
      return baseController.unauthorized(res);
    }

    const tasks = await Task.findAll({
      where: { user_id: user.id, status: 'pending' },
    });

    if (tasks.length === 0) {
      return baseController.notFound(res);
    }

    return baseController.success(res, tasks);
  } catch (e) {
    console.error('Erro ao listar tarefas:', e);
    return baseController.error(res, 'Erro ao listar tarefas');
  }
};

module.exports = {
  createTask,
  listPendingTasks,
};
