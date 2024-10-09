const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.PG_URI,
});

const connectPostgresDB = async () => {
    try {
        await pool.connect();
        console.log('PostgreSQL conectado');
    } catch (error) {
        console.error('Erro ao conectar no PostgreSQL', error);
        process.exit(1);
    }
};

module.exports = { pool, connectPostgresDB };
