const mysql = require('mysql');
const env=require('dotenv').config();

const dbConnection = mysql.createConnection({
    host:process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: env.DB_PASSWORD || '123',
    database: process.env.DB_NAME || 'spring_db',
    port:process.env.DB_PORT
 });
dbConnection.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
})
module.exports =dbConnection
