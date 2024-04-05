import React, { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const WebSocketComponent = () => {
  const [memberId, setMemberId] = useState(0);
  const [roomId, setRoomId] = useState(0);
  const [message, setMessage] = useState("");
  const [isConnecting, setIsConnecting] = useState(true);
  const messageAreaRef = useRef(null);
  const stompClientRef = useRef(null);

  useEffect(() => {
    const socket = new SockJS("/ws");
    const stompClient = Stomp.over(socket);
    stompClientRef.current = stompClient;

    if (memberId && roomId) {
      stompClient.connect(
        {},
        () => {
          stompClient.subscribe(`/topic/${roomId}/public`, onMessageReceived);
          stompClient.send(
            `/app/chat/${roomId}/addUser`,
            {},
            JSON.stringify({
              memberId: memberId,
              roomId: roomId,
              type: "JOIN",
            })
          );
          setIsConnecting(false);
        },
        onError
      );
    }

    return () => {
      stompClient.disconnect();
    };
  }, [memberId, roomId]);

  const connect = (event) => {
    event.preventDefault();
    setMemberId(parseInt(document.querySelector("#memberId").value));
    setRoomId(parseInt(document.querySelector("#roomId").value));
  };

  const sendMessage = (event) => {
    event.preventDefault();
    const messageContent = message.trim();
    if (messageContent && stompClientRef.current) {
      stompClientRef.current.send(
        `/app/chat/${roomId}/sendMessage`,
        {},
        JSON.stringify({
          roomId: roomId,
          sender: memberId,
          content: messageContent,
          type: "CHAT_TEXT",
        })
      );
      setMessage("");
    }
  };

  const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    // 메시지 수신 처리 로직
  };

  const onError = (error) => {
    console.error("WebSocket error:", error);
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div>
      <form id="usernameForm" onSubmit={connect}>
        <input id="memberId" type="number" placeholder="Enter Member ID" />
        <input id="roomId" type="number" placeholder="Enter Room ID" />
        <button type="submit">Connect</button>
      </form>

      <form id="messageForm" onSubmit={sendMessage}>
        <input
          id="message"
          type="text"
          value={message}
          onChange={handleInputChange}
        />
        <button type="submit">Send</button>
      </form>

      {isConnecting && <p>Connecting...</p>}

      <ul id="messageArea" ref={messageAreaRef}>
        {/* 메시지 목록 출력 */}
      </ul>
    </div>
  );
};

export default WebSocketComponent;
