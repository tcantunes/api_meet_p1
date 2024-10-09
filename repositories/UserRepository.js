const User = require('../models/User');

class UserRepository {
    static instance;

    constructor() {
        if (UserRepository.instance) {
            return UserRepository.instance;
        }
        UserRepository.instance = this;
    }

    async createUser(userData) {
        try {
            const user = new User(userData);
            return await user.save();
        } catch (error) {
            console.error('Erro ao criar usuário no repositório:', error);
            throw error;
        }
    }

    async findUserByEmail(email) {
        try {
            return await User.findOne({ email });
        } catch (error) {
            throw new Error('Erro ao encontrar usuário por email');
        }
    }

    async findUserById(id) {
        try {
            return await User.findById(id);
        } catch (error) {
            throw new Error('Erroao encontrar usuário por id');
        }
    }
}

module.exports = new UserRepository();
