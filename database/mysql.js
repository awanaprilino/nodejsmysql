const mysql = require("mysql");

const connection = mysql.createConnection({
  // Mysql Connection
  host: "localhost",
  user: "root",
  database: "nodemysql",
});

module.exports = connection;
