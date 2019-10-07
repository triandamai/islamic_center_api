"use strict";

const response = require("./response");
const connection = require("../config/connection");
const fs = require("fs");
var buffer = require("buffer");
var path = require("path");

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
  connection.query("SELECT * FROM " + TABLE_USER, (err, result, fields) => {
    err
      ? response.failed("", res, MESSAGE_ERROR + err.message)
      : response.ok(result, res, MESSAGE_SUCCESS);
  });
};
exports.findUsers = (req, res) => {
  var user_uid = req.params.user_uid;

  connection.query(
    "SELECT * FROM " + TABLE_USER + " WHERE uid = ?",
    [user_uid],

    (err, result, fields) => {
      console.log(user_uid);
      err
        ? response.failed("", res, MESSAGE_ERROR + err.message)
        : response.ok(result, res, MESSAGE_SUCCESS);
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
      " (uid,nama,nohp,email,foto,type) VALUES (?,?,?,?,?,?)",
    [
      req.body.uid,
      req.body.nama,
      req.body.nohp,
      req.body.email,
      req.body.foto,
      req.body.type
    ],
    (err, rows, fields) => {
      err
        ? response.failed("", res, MESSAGE_ERROR + err.message)
        : response.ok(result, res, MESSAGE_SUCCESS);
    }
  );
};

exports.updateUsers = (req, res) => {
  connection.query(
    "UPDATE user SET nama = ?, nohp = ?, email = ?, type = ?, foto = ? WHERE uid = ?",
    [
      req.body.nama,
      req.body.nohp,
      req.body.email,
      req.body.type,
      req.body.foto,
      req.body.uid
    ],
    (err, result, fields) => {
      err
        ? response.failed("", res, MESSAGE_ERROR + err.message)
        : response.ok(result, res, MESSAGE_SUCCESS);
    }
  );
};

exports.deleteUser = (req, res) => {
  connection.query("DELETE FROM " + TABLE_USER + " WHERE uid= ?"),
    [req.body.uid],
    (err, result, fields) => {
      err
        ? response.failed("", res, MESSAGE_ERROR + err.message)
        : response.ok(result, res, MESSAGE_SUCCESS);
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
        code 1 = foto null 2 other data = null 3 ok 4 tidak ada
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
          response.ok(4, res, "Error User tidak ditemukan");
        }
      }
    }
  );
};
//upload
exports.uploadimageuser = (req, res) => {
  var name = req.body.namafile;
  var img = req.body.image;

  var bitmap = Buffer.from(img, "base64");

  fs.writeFile(path.join(__dirname, "/public/", name), bitmap, err => {
    err
      ? response.failed("", res, MESSAGE_ERROR + err.message)
      : response.ok("sukses", res, MESSAGE_SUCCESS);
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
      err
        ? response.failed("", res, MESSAGE_ERROR + err.message)
        : response.ok(result, res, MESSAGE_SUCCESS);
    }
  );
};
//kajian
exports.getKajian = (req, res) => {
  connection.query("SELECT * FROM ", (err, result, fields) => {
    err
      ? response.failed("", res, MESSAGE_ERROR + err.message)
      : response.ok(result, res, MESSAGE_SUCCESS);
  });
};
exports.createKajian = (req, res) => {};
exports.findKajian = (req, res) => {};
exports.updateKajian = (req, res) => {};
exports.deleteKajian = (req, res) => {};

//admin
exports.getAdmin = (req, res) => {
  connection.query("SELECT * FROM " + TABLE_ADMIN, (err, result, fields) => {
    err
      ? response.failed("", res, MESSAGE_ERROR + err.message)
      : response.ok(result, res, MESSAGE_SUCCESS);
  });
};
exports.adminId = (req, res) => {
  connection.query(
    "SELECT * FROM admin WHERE id=?",
    [req.params.id],
    (err, result, fields) => {
      err
        ? response.failed("", res, MESSAGE_ERROR + err.message)
        : response.ok(result, res, MESSAGE_SUCCESS);
    }
  );
};
exports.findAdmin = () => {
  connection.query(
    "SELECT * FROM " + TABLE_ADMIN + "WHERE username=? AN password=?",
    [req.body.username, req.body.password],
    (err, result, fields) => {
      err
        ? response.failed("", res, MESSAGE_ERROR + err.message)
        : response.ok(result, res, MESSAGE_SUCCESS);
    }
  );
};

exports.createAdmin = (req, res) => {
  connection.query(
    "INSERT INTO admin (id,username,password,level) VALUES (?,?,?,?)",
    [req.body.id, req, body.username, req.body.password, req.body.level],
    (err, result, fields) => {
      err
        ? response.failed("", res, MESSAGE_ERROR + err.message)
        : response.ok(result, res, MESSAGE_SUCCESS);
    }
  );
};

exports.updateAdmin = (req, res) => {
  connection.query(
    "UPDATE admin SET username=? password=? level=? WHERE id=?",
    [req.body.username, req.body.password, req.body.level, req.body.id],
    (result, res, fields) => {
      err
        ? response.failed("", res, MESSAGE_ERROR + err.message)
        : response.ok(result, res, MESSAGE_SUCCESS);
    }
  );
};

exports.deleteAdmin = (req, res) => {
  connection.query("DELETE admin WHERE id=?", [], (err, result, fields) => {
    err
      ? response.failed("", res, MESSAGE_ERROR + err.message)
      : response.ok(result, res, MESSAGE_SUCCESS);
  });
};
exports.index = (req, res) => {
  var data = {
    status: 200,
    message: "Selamat Datang"
  };

  res.json(data);
  res.end();
};
