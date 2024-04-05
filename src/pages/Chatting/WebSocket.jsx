import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const WebSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleConnect = () => {
    if (socket) {
      socket.connect();
    }
  };

  const handleDisconnect = () => {
    if (socket) {
      socket.disconnect();
    }
  };

  return (
    <div>
      <p>WebSocket 연결이 설정되었습니다.</p>
      <button onClick={handleConnect}>연결하기</button>
      <button onClick={handleDisconnect}>연결 끊기</button>
    </div>
  );
};

export default WebSocket;
