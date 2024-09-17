const username = prompt("whats should call you?");

const socket = new WebSocket(`ws://localhost:4001/${username}`);
// console.log(socket);

const message = document.querySelector("input");
const chat = document.querySelector("ul");
let userID = null;

socket.addEventListener("open", () => {
  message.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      if (e.target.value.trim()) {
        socket.send(e.target.value.trim());
        message.value = "";
      }
    }
  });

  //   socket.send("hi, im your client");
  socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    if (data.message) {
      chat.insertAdjacentHTML(
        "beforeend",
        `<li class=${userID === data.userID ? "own" : ""}>${data.userID}: ${
          data.message
        }</li>`
      );
    } else {
      userID = data.userID;
    }
  });
});
