"use strict";

module.exports = app => {
  var user = require("../lib/controller_user");
  var admin = require("../lib/controller_admin");
  var kajian = require("../lib/controller_kajian");

  app.route("/").get(user.index);

  //user
  app.route("/users").get(user.users);
  app.route("/users/:user_uid").get(user.findUsers);
  app.route("/users").post(user.createUsers);
  app.route("/users").put(user.updateUsers);
  app.route("/users").delete(user.deleteUser);
  app.route("/cekuser/:user_uid").get(user.checkUser);
  //validasi
  app.route("/createValidasi").post();

  //kajian
  app.route("/post").get(kajian.allKajian);
  app.route("/post").post(kajian.uploadKajian);
  app.route("/post").put();
  app.route("/post").delete();

  //admin
  app.route("/login").post(admin.findAdmin);
  app.route("/admin").get(admin.adminData);
  app.route("/admin/:id").get(admin.adminId);
  app.route("/admin").post(admin.createAdmin);
  app.route("/admin").put(admin.updateAdmin);
  app.route("/admin").delete(admin.deleteAdmin);

  //upload image
  app.route("/uploadimage").post(user.uploadimageuser);
  app.route("/upload").post(user.uploadFileImage);
};
