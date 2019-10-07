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
  console.log("connect to database");
});

module.exports = con;
// const mysql = require("mysql");

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "projekus_trian",
//   password: "asdf1998Buka",
//   database: "projekus_islamic_center",
//   port: 3306
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("connect");
// });

// module.exports = con;
