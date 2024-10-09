const RoomRepository = require('../repositories/RoomRepository');

class RoomController {
    static instance;

    constructor() {
        if (RoomController.instance) {
            return RoomController.instance;
        }
        RoomController.instance = this;
    }

    async createRoom(req, res) {
        const { name, description, capacity } = req.body;
        try {
            const roomData = { name, description, capacity };
            const room = await RoomRepository.createRoom(roomData);
            res.status(201).json(room);
        } catch (error) {
            res.status(400).send('Erro ao criar sala');
        }
    }

    async getRooms(req, res) {
        try {
            const rooms = await RoomRepository.getAllRooms();
            res.json(rooms);
        } catch (error) {
            res.status(400).send('Erro ao encontrar sala');
        }
    }

    async joinRoom(req, res) {
        const { roomId } = req.params;
        try {
            const room = await RoomRepository.findRoomById(roomId);
            if (!room) return res.status(404).send('Sala não encontrada');
            res.status(200).send('Juntou-se a sala');
        } catch (error) {
            res.status(400).send('Erro ao juntar-se a sala');
        }
    }
}

module.exports = new RoomController();
