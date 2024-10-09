const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const roomSchema = new mongoose.Schema({
    roomId: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    description: String,
    capacity: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Room', roomSchema);
