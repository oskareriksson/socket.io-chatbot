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
    var test = input.value.toLowerCase();

    if(input.value === "!help"){
      socket.emit("help");
    }
    input.value = "";
  }
});

//Handler for adding questions from "!help" command and questions array to chatbox
socket.on("help", (questions) => {
  questions.forEach((element) => {
    let h3 = document.createElement("h3");
    h3.innerHTML = element;
    chatbox.appendChild(h3);
  });
});

socket.on("greeting", (data) => {
  let h3 = document.createElement("h3");
  h3.innerHTML = data;
  chatbox.appendChild(h3);
});

socket.on("message", (data) => {
  let p = document.createElement("p");
  p.innerHTML = `${data.username} : ${data.value}`;
  chatbox.appendChild(p);
});

/*socket.on("message", (message) => {
  console.log(message);
});

socket.emit("clientmessage", "Hello from client!");*/