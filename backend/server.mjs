import { createServer } from "http";
import WebSocket, { WebSocketServer } from "ws";

const PORT = process.env.PORT;
const server = createServer((req, res) => {});

const ws = new WebSocketServer({ server });

ws.on("headers", (headers) => {
  console.log(headers);
});

server.listen(PORT, () => console.log(`live on ${PORT}`));
