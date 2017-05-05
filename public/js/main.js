let socket = io.connect();

let name = document.getElementById("name");
let input = document.getElementById("input");
let chatbox = document.getElementById("chatbox");
let username = "";

input.style.display = "none";

function botResponse(answer) {
  let h3 = document.createElement("h3");
  h3.innerHTML = answer;
  chatbox.appendChild(h3);
}

function chat(data) {
  let p = document.createElement("p");
  p.innerHTML = `${data.username} : ${data.value}`;
  chatbox.appendChild(p);
}

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
    case "do you have any hobbies?":
      socket.emit("q5");
      break;
    default:
      socket.emit("default");
    }
    input.value = "";
  }
});

socket.on("greeting", (data) => {
  botResponse(data);
});

socket.on("chat", (data) => {
  chat(data);
});

//Handler for adding questions from "!help" command and questions array to chatbox
socket.on("help", (questions) => {
  questions.forEach((element) => {
    botResponse(element);
  });
});

socket.on("q1", (answer) => {
  botResponse(answer);
});

socket.on("q2", (answer) => {
  botResponse(answer);
});

socket.on("q3", (answer) => {
  botResponse(answer);
});

socket.on("q4", (answer) => {
  botResponse(answer);
});

socket.on("q5", (answer) => {
  botResponse(answer);
});

socket.on("default", (data) => {
  botResponse(data);
});