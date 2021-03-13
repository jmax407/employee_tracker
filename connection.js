const mysql = require('mysql2');
// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employees'
  });


  connection.connect(function(error){
    if(error) throw error;
    console.log("Database connected");
    conn.end();

});
module.exports = connection;