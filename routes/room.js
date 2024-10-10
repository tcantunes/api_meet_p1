const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const RoomController = require('../controllers/roomController');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       required:
 *         - name
 *         - capacity
 *       properties:
 *         roomId:
 *           type: string
 *           description: ID único da sala
 *         name:
 *           type: string
 *           description: Nome da sala
 *         description:
 *           type: string
 *           description: Descrição da sala
 *         capacity:
 *           type: integer
 *           description: Capacidade máxima da sala
 *         isActive:
 *           type: boolean
 *           description: Indica se a sala está ativa
 */

/**
 * @swagger
 * /api/rooms/create:
 *   post:
 *     summary: Cria uma nova sala de reunião
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       201:
 *         description: Sala criada com sucesso
 *       400:
 *         description: Erro ao criar a sala
 */
router.post('/create', authenticateToken, RoomController.createRoom);

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Lista todas as salas disponíveis
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de salas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       400:
 *         description: Erro ao buscar salas
 */
router.get('/', authenticateToken, RoomController.getRooms);

/**
 * @swagger
 * /api/rooms/join/{roomId}:
 *   post:
 *     summary: Juntar-se a uma sala existente
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: roomId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: ID da sala
 *     responses:
 *       200:
 *         description: Juntou-se à sala
 *       404:
 *         description: Sala não encontrada
 *       400:
 *         description: Erro ao juntar-se à sala
 */
router.post('/join/:roomId', authenticateToken, RoomController.joinRoom);

module.exports = router;
