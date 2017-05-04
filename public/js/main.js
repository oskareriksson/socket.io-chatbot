let socket = io.connect();

let name = document.getElementById("name");
let input = document.getElementById("input");
let chatbox = document.getElementById("chatbox");
let username = "";

input.addEventListener("keypress", (e) => {
  if(e.which == 13 || e.keyCode == 13) {
    socket.emit("chat", { username: username, value: input.value});
    input.value = "";
  }
});

name.addEventListener("keypress", function(e) {
  if(e.which == 13 || e.keyCode == 13) {
    username = this.value;
    this.parentElement.removeChild(this);
  }
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