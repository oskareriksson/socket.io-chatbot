const express = require("express");
const socket = require("socket.io");
let app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const helmet = require("helmet");
const colors = require("colors");
const pug = require("pug");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const routes = require("./routes/routes.js");
const config = require("./config/config.js");

app.use(helmet());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set("view engine", "pug");
app.use("/public", express.static("public"));
app.use("/", routes);

//When user connects
io.on("connection", (socket) => {
  //User socket
  socket.on("chat", (data) => {
    io.emit("message", data);
  });

});

server.listen(config.port, () => {
  console.log(`Server up and running at port ${config.port}`.blue);
});