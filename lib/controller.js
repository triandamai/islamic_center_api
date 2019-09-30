"use strict";

var response = require("./response");
var connection = require("../config/connection");

exports.users = (req, res) => {
  connection.query("SELECT * FROM user", (err, rows, fields) => {
    if (err) {
      response.failed(rows, res, "Database Error :" + err.message);
    } else {
      response.ok(rows, res, "Operasi Sukses");
    }
  });
};
exports.findUsers = (req, res) => {
  var user_uid = req.params.user_uid;

  connection.query(
    "SELECT * FROM user WHERE uid =" + user_uid,

    (err, result, fields) => {
      if (err) {
        response.failed(rows, res, "Database Error :" + err.message);
      } else {
        response.ok(rows, res, "Operasi Sukses");
      }
    }
  );
};

exports.createUsers = (req, res) => {
  let data = {
    uid: req.body.uid,
    nama: req.body.nama,
    nohp: req.body.nohp,
    email: req.body.email,
    foto: req.body.foto,
    type: req.body.type
  };
  connection.query(
    "INSERT INTO user (uid,nama,nohp,email,foto,type) values (?,?,?,?,?,?)",
    [
      req.body.uid,
      req.body.nama,
      req.body.nohp,
      req.body.email,
      req.body.foto,
      req.body.type
    ],
    (err, rows, fields) => {
      if (err) {
        response.failed(rows, res, "Database Error :" + err.message);
      } else {
        response.ok(rows, res, "Operasi Sukses");
      }
    }
  );
};

exports.updateUsers = (req, res) => {};

exports.deleteUser = (req, res) => {};

exports.index = (req, res) => {
  var data = {
    status: 200,
    values: "Selamat Datang"
  };

  res.json(data);
  res.end();
};
