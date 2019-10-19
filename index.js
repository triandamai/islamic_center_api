const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const routes = require("./lib/routes");
const serveIndex = require("serve-index");

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//app.use(express.json({ limit: "50mb" }));
//app.use(express.urlencoded({ limit: "50mb" }));

app.use(
  "/ftp",
  express.static("public"),
  serveIndex("public", { icons: true })
);
routes(app);
app.listen(port, (stat, err) => {
  console.log("localhost:" + port);
});
