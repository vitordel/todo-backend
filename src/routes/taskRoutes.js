const express = require('express');

const router = express.Router();

const controller = require('../controllers/taskController');
const authenticateToken = require('../middleware/authenticateToken');
/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Gerenciamento de tarefas.
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa.
 *     tags: [Tasks]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: Finalizar relatório
 *               priority:
 *                 type: string
 *                 enum: [Alta, Média, Baixa]
 *                 example: Alta
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 description:
 *                   type: string
 *                 priority:
 *                   type: string
 *                 status:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Não autorizado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post('/', authenticateToken, controller.createTask);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Lista todas as tarefas pendentes do usuário.
 *     tags: [Tasks]
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Lista de tarefas pendentes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   description:
 *                     type: string
 *                   priority:
 *                     type: string
 *                   status:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Não autorizado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/', authenticateToken, controller.listPendingTasks);

module.exports = router;
