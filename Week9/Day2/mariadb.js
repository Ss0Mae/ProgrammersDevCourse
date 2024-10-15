const mysql = require('mysql2/promise');

// Create the connection to database
const connection = async () => {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'Bookshop',
    dateStrings: true
  });
  return conn;
}

module.exports = connection;

