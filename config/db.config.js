const env = process.env;
const mysql = require('mysql');
const dbConnection = mysql.createConnection({
    host: env.DB_HOST || 'localhost',
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || '123',
    database: env.DB_NAME || 'spring_db',
    port:3308
  });
dbConnection.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
})
module.exports =dbConnection


