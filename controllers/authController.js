const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/UserRepository');

class AuthController {
    static instance;

    constructor() {
        if (AuthController.instance) {
            return AuthController.instance;
        }
        AuthController.instance = this;
    }

    async register(req, res) {
        const { name, email, password } = req.body;
        try {
            const saltRounds = 10; 
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const userData = { name, email, password: hashedPassword };
            await UserRepository.createUser(userData);
            res.status(201).send('Usuário Registrado');
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            res.status(400).send('Erro ao registrar');
        }
    }
    

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await UserRepository.findUserByEmail(email);
            if (!user) return res.status(404).send('Usuário não encontrado');

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) return res.status(400).send('Credencial inválida');

            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            console.error('Erro ao logar:', error);
            res.status(400).send('Error');
        }
    }
}

module.exports = new AuthController();
