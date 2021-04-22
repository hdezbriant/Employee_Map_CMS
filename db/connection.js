const mysql = require("mysql");

// Create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3001,
  //   YOUR username
  user: "root",
  //   YOUR password
  password: "",
  database: "employee_DB",
});

module.exports = connection;
