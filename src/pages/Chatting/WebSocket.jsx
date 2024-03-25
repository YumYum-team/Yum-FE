import React, { useEffect } from "react";

const WebSocketHandler = {
  socket: null,

  connect: () => {
    WebSocketHandler.socket = new WebSocket("ws://localhost:8080/ws");

    WebSocketHandler.socket.onopen = () => {
      console.log("Connected to WebSocket");
    };

    WebSocketHandler.socket.onmessage = (event) => {
      console.log("Received message:", event.data);
      // 받은 메시지 처리 추가
    };

    WebSocketHandler.socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    WebSocketHandler.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  },

  sendMessage: (message) => {
    WebSocketHandler.socket.send(message);
  },
};

const WebSocketComponent = () => {
  useEffect(() => {
    WebSocketHandler.connect();
  }, []);

  return null;
};

export default WebSocketComponent;
