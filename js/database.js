const mysql = require('mysql2');
const { Sequelize, DataTypes } = require("sequelize");
require('dotenv').config()

const sequelize = new Sequelize(
    'todo',
    process.env.DB_USER_NAME,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

module.exports = sequelize