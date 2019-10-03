"use strict";

const response = require("./response");
const connection = require("../config/connection");
const fs = require("fs");

var TABLE_USER = "user";
var TABLE_KAJIAN = "";
var TABLE_VALIDASI = "validasi";
var TABLE_DETAIL_USER = "";
var TABLE_ADMIN = "admin";
var MESSAGE_SUCCESS = "Operasi Sukses !";
var MESSAGE_FAILED = "Operasi Gagal ?";
var MESSAGE_ERROR = "Error :";

//user
exports.users = (req, res) => {
  connection.query("SELECT * FROM " + TABLE_USER, (err, rows, fields) => {
    if (err) {
      response.failed(rows, res, MESSAGE_ERROR + err.message);
    } else {
      response.ok(rows, res, MESSAGE_SUCCESS);
    }
  });
};
exports.findUsers = (req, res) => {
  var user_uid = req.params.user_uid;

  connection.query(
    "SELECT * FROM " + TABLE_USER + " WHERE uid = ?",
    [user_uid],

    (err, result, fields) => {
      console.log(user_uid);
      if (err) {
        response.failed(result, res, MESSAGE_ERROR + err.message);
      } else {
        response.ok(result, res, MESSAGE_SUCCESS);
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
    "INSERT INTO " +
      TABLE_USER +
      " (uid,nama,nohp,email,foto,type) values (?,?,?,?,?,?)",
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
        response.failed(rows, res, MESSAGE_ERROR + err.message);
      } else {
        response.ok(rows, res, MESSAGE_SUCCESS);
      }
    }
  );
};

exports.updateUsers = (req, res) => {
  connection.query(
    "UPDATE " +
      TABLE_USER +
      " SET nama = ? nohp= ? email = ? type = ? foto =? WHERE uid =" +
      req.body.uid,
    [
      req.body.nama,
      req.body.nohp,
      req.body.email,
      req.body.type,
      req.body.foto
    ],
    (err, result, fields) => {
      if (err) {
        response.failed("", res, MESSAGE_ERROR + err.message);
      } else {
        response.ok(result, res, MESSAGE_SUCCESS);
      }
    }
  );
};

exports.deleteUser = (req, res) => {
  connection.query("DELETE FROM " + TABLE_USER + " WHERE uid= ?"),
    [req.body.uid],
    (err, result, fields) => {
      if (err) {
        response.failed("", res, MESSAGE_ERROR + err.message);
      } else {
        response.ok(result, res, MESSAGE_SUCCESS);
      }
    };
};

exports.checkUser = (req, res) => {
  var user_uid = req.params.user_uid;
  connection.query(
    "SELECT * FROM " + TABLE_USER + " WHERE uid = ? ",
    [user_uid],
    (err, result, fields) => {
      if (err) {
        response.failed("", res, MESSAGE_ERROR + err.message);
      } else {
        /*
        code 1 = foto null 2 other data = null 3 ok
        */
        if (result[0] != null) {
          var foto = result[0].foto;
          var nama = result[0].nama;
          var nohp = result[0].nohp;
          var email = result[0].email;
          var tipe = result[0].type;
          if (foto == null) {
            response.ok(1, res, MESSAGE_SUCCESS);
          } else if (nama == null || nohp == null || email == null) {
            response.ok(2, res, MESSAGE_SUCCESS);
          } else if (tipe == null) {
            response.failed("", res, "Error User tidak ditemukan");
          } else {
            response.ok(3, res, MESSAGE_SUCCESS);
          }
        } else {
          response.failed("", res, "Error User tidak ditemukan");
        }
      }
    }
  );
};

exports.uploadimageuser = (req, res) => {
  var name = req.body.namafile;
  var img = req.body.image;
  var file = Buffer.from(img, "base64");
  fs.writeFile(name, file, err => {
    if (err) {
      response.failed("", res, MESSAGE_ERROR + err.message);
    } else {
      response.ok(" " + name, res, MESSAGE_SUCCESS);
    }
  });
};
//admin
exports.loginAdmin = (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  connection.query(
    "SELECT * FROM " + TABLE_ADMIN + "WHERE username = ? AND password = ?",
    [username, password],
    (err, result, fields) => {
      if (err) {
        response.failed("", res, MESSAGE_ERROR + err.message);
      } else {
        response.ok(result, res, MESSAGE_SUCCESS);
      }
    }
  );
};
//kajian
exports.getKajian = (req, res) => {
  connection.query("SELECT * FROM ", (err, result, fields) => {
    if (err) {
      response.failed("", res, MESSAGE_ERROR + err.message);
    } else {
      response.ok(result, res, MESSAGE_SUCCESS);
    }
  });
};
exports.createKajian = (req, res) => {};
exports.findKajian = (req, res) => {};
exports.updateKajian = (req, res) => {};
exports.deleteKajian = (req, res) => {};

exports.index = (req, res) => {
  var data = {
    status: 200,
    message: "Selamat Datang"
  };

  res.json(data);
  res.end();
};
