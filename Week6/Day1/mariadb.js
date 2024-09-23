const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  host: '127.0.0.1',
    user: 'root',
  password : '1234',
    database: 'Youtube',
  dateStrings : true
});

module.exports= connection 

