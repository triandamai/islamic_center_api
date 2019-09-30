"use strict";

module.exports = app => {
  var users = require("../lib/controller");

  app.route("/").get(users.index);

  //user
  app.route("/users").get(users.users);
  app.route("/users/:user_uid").get(users.findUsers);
  app.route("/users").post(users.createUsers);
  app.route("/users").put(users.updateUsers);
  app.route("/users").delete(users.deleteUser);
};
