const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbPostgres'); 

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'users',
    timestamps: false,
});

module.exports = User;
