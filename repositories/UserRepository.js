const User = require('../models/User');

class UserRepository {
    static instance;

    constructor() {
        if (UserRepository.instance) {
            return UserRepository.instance;
        }
        UserRepository.instance = this;
    }

    async getAllUsers() {
        try {
            return await User.findAll();
        } catch (error) {
            throw new Error('Erro ao buscar usuários');
        }
    }

    async createUser(userData) {
        try {
            return await User.create(userData);
        } catch (error) {
            console.error('Erro ao criar usuário no repositório:', error);
            throw error;
        }
    }

    async findUserByEmail(email) {
        try {
            return await User.findOne({ where: { email } });
        } catch (error) {
            throw new Error('Erro ao encontrar usuário por email');
        }
    }

    async findUserById(id) {
        try {
            return await User.findByPk(id);
        } catch (error) {
            throw new Error('Erro ao encontrar usuário por id');
        }
    }
}

module.exports = new UserRepository();
