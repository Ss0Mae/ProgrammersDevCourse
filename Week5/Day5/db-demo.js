const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
    user: 'root',
  password : '1234',
    database: 'Youtube',
  dateStrings : true
});

// A simple SELECT query
connection.query(
  'SELECT * FROM `users`',
  function (err, results, fields) {
    //console.log(results); // results contains rows returned by server
      for (let i = 0; i < results.length; i++){
          let { id, email, name, created_at } = results[i];
          console.log(id);
          console.log(email);
          console.log(name);
          console.log(created_at);
      }
  }
);

// // Using placeholders
// connection.query(
//   'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//   ['Page', 45],
//   function (err, results) {
//     console.log(results);
//   }
// );