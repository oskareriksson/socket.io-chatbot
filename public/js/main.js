let socket = io.connect();

let name = document.getElementById("name");
let input = document.getElementById("input");
let chatbox = document.getElementById("chatbox");
let username = "";

input.style.display = "none";

//Eventlistener for username input
name.addEventListener("keypress", function(e) {
  if(e.which == 13 || e.keyCode == 13) {
    username = this.value;
    this.parentElement.removeChild(this);
    input.style.display = "block";
  }
});

//Eventlistener for input element
input.addEventListener("keypress", (e) => {
  if(e.which == 13 || e.keyCode == 13) {
    socket.emit("chat", { username: username, value: input.value});
    var command = input.value.toLowerCase();

    switch(command) {
    case "!help":
      socket.emit("help");
      break;
    case "who coded you?":
      socket.emit("q1");
      break;
    case "how tall are you?":
      socket.emit("q2");
      break;
    case "what's your name?":
      socket.emit("q3");
      break;
    case "how old are you?":
      socket.emit("q4");
      break;
    case "what's your hobby?":
      socket.emit("q5");
      break;
    default:
      socket.emit("default");
    }
    input.value = "";
  }
});

socket.on("greeting", (data) => {
  let h3 = document.createElement("h3");
  h3.innerHTML = data;
  chatbox.appendChild(h3);
});

socket.on("chat", (data) => {
  let p = document.createElement("p");
  p.innerHTML = `${data.username} : ${data.value}`;
  chatbox.appendChild(p);
});

//Handler for adding questions from "!help" command and questions array to chatbox
socket.on("help", (questions) => {
  questions.forEach((element) => {
    let h3 = document.createElement("h3");
    h3.innerHTML = element;
    chatbox.appendChild(h3);
  });
});

socket.on("q1", (answer) => {
  let h3 = document.createElement("h3");
  h3.innerHTML = answer;
  chatbox.appendChild(h3);
});

socket.on("q2", (answer) => {
  let h3 = document.createElement("h3");
  h3.innerHTML = answer;
  chatbox.appendChild(h3);
});

socket.on("q3", (answer) => {
  let h3 = document.createElement("h3");
  h3.innerHTML = answer;
  chatbox.appendChild(h3);
});

socket.on("q4", (answer) => {
  let h3 = document.createElement("h3");
  h3.innerHTML = answer;
  chatbox.appendChild(h3);
});

socket.on("q5", (answer) => {
  let h3 = document.createElement("h3");
  h3.innerHTML = answer;
  chatbox.appendChild(h3);
});

socket.on("default", (data) => {
  let h3 = document.createElement("h3");
  h3.innerHTML = data;
  chatbox.appendChild(h3);
});