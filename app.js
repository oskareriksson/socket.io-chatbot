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

const questions = ["Who coded you?", "How tall are you?", "What's your name?", "How old are you?", "Do you have any hobbies?"];
const answers = ["Oskar Eriksson!", "I don't know, I'm just a bot.", "ENIAC McBot Junior", "Not sure, depends on when my author launches me..", "Answering your questions is basically all I do!"];

//When user connects
io.on("connection", (socket) => {
  socket.emit("greeting", "Hi! Welcome to the server. Im a bot, here to help you. Ask me a question, or type '!help' to find out what questions I can answer.");

  socket.on("chat", (data) => {
    io.emit("chat", data);
  });

  socket.on("help", () => {
    socket.emit("help", questions);
  });

  socket.on("q1", () => {
    socket.emit("q1", answers[0]);
  });

  socket.on("q2", () => {
    socket.emit("q2", answers[1]);
  });

  socket.on("q3", () => {
    socket.emit("q3", answers[2]);
  });

  socket.on("q4", () => {
    socket.emit("q4", answers[3]);
  });

  socket.on("q5", () => {
    socket.emit("q5", answers[4]);
  });

  socket.on("default", () => {
    socket.emit("default", "Sorry, I don't recognize that command.. Try typing it again or type '!help' to see what I can answer!");
  });
});

server.listen(config.port, () => {
  console.log(`Server up and running at port ${config.port}`.blue);
});