const {Sequelize} = require('sequelize');

export default new Sequelize ({
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    dialect: "postgres",
    host: 'localhost'

});