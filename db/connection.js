const mysql = require("mysql");

// Create the connection information for the sql database
const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Be sure to update with your own MySQL password!
    password: "password",
    database: "company_DB",
  });

module.exports = connection;
