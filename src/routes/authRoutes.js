const express = require('express');

const controller = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de Autenticação
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: joaosilva@example.com
 *               password:
 *                 type: string
 *                 example: senha123
 *               name:
 *                 type: string
 *                 example: Joao Silva
 *     responses:
 *       200:
 *         description: Successful registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: jwt-token-here
 *       422:
 *         description: Validation error or user already exists
 */
router.post('/register', controller.register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autenticar usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: joaosilva@example.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: João Silva
 *                 email:
 *                   type: string
 *                   example: joaosilva@example.com
 *                 token:
 *                   type: string
 *                   example: jwt-token-here
 *       404:
 *         description: User not found
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', controller.login);

module.exports = router;
