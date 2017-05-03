let socket = io.connect();

socket.on("message", (message) => {
  console.log(message);
});

socket.emit("clientmessage", "Hello from client!");