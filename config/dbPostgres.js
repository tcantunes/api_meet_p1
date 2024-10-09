const { Pool } = require('pg');
const { Sequelize } = require('sequelize');

const pool = new Pool({
    connectionString: process.env.POSTGRES_URI,
});

const sequelize = new Sequelize(process.env.POSTGRES_URI);

const connectPostgresDB = async () => {
    try {
        await pool.connect();
        console.log('PostgreSQL conectado');
        await sequelize.authenticate();
        console.log('Conexão com Sequelize estabelecida');
    } catch (error) {
        console.error('Erro ao conectar no PostgreSQL', error);
        process.exit(1);
    }
};

module.exports = { pool, connectPostgresDB, sequelize };

