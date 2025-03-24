import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import net from "net";

const app = express();
const WEB_PORT = 8000;
const TCP_SOCKET_PORT = 9000;

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

let tcpSocketClients = [];
let webSocketClients = [];
let buffer = ""; // 🔥 전역 변수로 버퍼 선언

// TCP Socket 서버 설정
const tcpSocketServer = net.createServer((socket) => {
  console.log("TCP Socket client connected");

  tcpSocketClients.push(socket);

  socket.on("data", (data) => {
    buffer += data.toString(); // 기존 데이터에 추가
    let boundary = buffer.indexOf("\n");

    while (boundary !== -1) {
      const jsonData = buffer.substring(0, boundary);
      buffer = buffer.substring(boundary + 1); // 처리한 부분 삭제

      try {
        const message = JSON.parse(jsonData);
        //console.log("Received from TCP:", message);

        // WebSocket 클라이언트에게 전송
        webSocketClients.forEach((webSocketClient) => {
          webSocketClient.send(JSON.stringify(message));
        });
      } catch (error) {
        console.error("JSON Parsing Error:", error);
      }

      boundary = buffer.indexOf("\n"); // 다음 메시지 찾기
    }
  });

  socket.on("error", (err) => {
    console.error("TCP socket error:", err.message);
  });

  socket.on("end", () => {
    console.log("TCP client disconnected");
    tcpSocketClients = tcpSocketClients.filter(
      (tcpSocketClient) => tcpSocketClient !== socket
    );
  });
});

// Web Socket 서버 설정
wss.on("connection", (ws) => {
  console.log("Web Socket client connected");

  webSocketClients.push(ws);

  ws.on("message", (message) => {
    console.log("Received from WebSocket:", message);

    // TCP 클라이언트에게 전송
    tcpSocketClients.forEach((tcpSocketClient) => {
      tcpSocketClient.write(message + "\n");
    });
  });

  ws.on("close", () => {
    console.log("Web Socket client disconnected");
    webSocketClients = webSocketClients.filter(
      (webSocketClient) => webSocketClient !== ws
    );
  });
});

// TCP Socket 서버 시작
tcpSocketServer.listen(TCP_SOCKET_PORT, () => {
  console.log(`TCP Socket server listening on port ${TCP_SOCKET_PORT}`);
});

// Web 서버 시작 (REST + WebSocket)
server.listen(WEB_PORT, () => {
  console.log(`Web server listening on port ${WEB_PORT}`);
});
