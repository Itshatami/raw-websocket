import { createServer } from "http";
import WebSocket, { WebSocketServer } from "ws";

const PORT = process.env.PORT;
const server = createServer((req, res) => {});

const ws = new WebSocketServer({ server });

ws.on("headers", (headers) => {
  console.log(headers);
});

ws.on("connection", (socket, req) => {
  const userID = req.url.slice("1");
  socket.id = userID;

  socket.send(
    JSON.stringify({
      userID: userID,
    })
  );

  socket.on("message", (data) => {
    ws.clients.forEach((client) => {
      client.send(
        JSON.stringify({
          userID: userID,
          message: data.toString(),
        })
      );
    });
  });
});

server.listen(PORT, () => console.log(`live on ${PORT}`));
