const express = require("express");
const helmet = require("helmet");
const colors = require("colors");
const pug = require("pug");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes/routes.js");
const config = require("./config/config.js");
let app = express();

app.use(helmet());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set("view engine", "pug");
app.use("/public", express.static("public"));
app.use("/", routes);

app.listen(config.port, () => {
  console.log(`Server up and running at port ${config.port}`.blue);
});