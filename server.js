require('dotenv').config();
const express = require('express');
const http = require('http');
const connectMongoDB = require('./config/dbMongo');
const { connectPostgresDB } = require('./config/dbPostgres');
const authRoutes = require('./routes/auth');
const roomRoutes = require('./routes/room');
const { authenticateToken } = require('./middleware/authMiddleware');
const { socketConnection } = require('./config/socket');
const cors = require('cors');

const app = express();
const server = http.createServer(app);  

app.use(cors());

app.use(express.json());

connectMongoDB();
connectPostgresDB();

app.get('/', (req, res) => res.send('API rodando'));
app.use('/api/auth', authRoutes);
app.use('/api/rooms', authenticateToken, roomRoutes);

socketConnection(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Servidor roedando na porta ${PORT}`));
