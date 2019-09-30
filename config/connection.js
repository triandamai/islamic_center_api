const mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "islamic_center",
  port: 3306
});

con.connect(function(err) {
  if (err) throw err;
  console.log("connect");
});

module.exports = con;
