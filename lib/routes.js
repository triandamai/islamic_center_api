"use strict";

module.exports = app => {
  var controller = require("../lib/controller");

  app.route("/").get(users.index);

  //user
  app.route("/users").get(controller.users);
  app.route("/users/:user_uid").get(controller.findUsers);
  app.route("/users").post(controller.createUsers);
  app.route("/users").put(controller.updateUsers);
  app.route("/users").delete(controller.deleteUser);
  app.route("/cekuser/:user_uid").get(controller.checkUser);

  //kajian
  app.route("/post").get();
  app.route("/post").post();
  app.route("/post").put();
  app.route("/post").delete();

  //admin
  app.route("/login").post(controller.loginAdmin);
};
