const socketio = require('socket.io');
const jwt = require('jsonwebtoken');

let io;

const socketConnection = (server) => {
    io = socketio(server);

    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Erro de autenticação: Token não encontrado'));
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return next(new Error('Erro de autenticação: token invalido'));
            }
            socket.user = decoded;
            next();
        });
    });

    io.on('connection', (socket) => {
        console.log('Nova conexão WebSocket:', socket.id);

        socket.on('join-room', (roomId, userId) => {
            if (!socket.user) {
                return socket.disconnect();
            }

            socket.join(roomId);
            socket.to(roomId).emit('user-connected', userId);

            socket.on('disconnect', () => {
                socket.to(roomId).emit('user-disconnected', userId);
            });
        });
    });
};

module.exports = { socketConnection };

