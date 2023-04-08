var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "employee_db"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});