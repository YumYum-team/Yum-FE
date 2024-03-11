import React, { useState, useEffect } from "react";
import "./ChatClient.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ChatClient = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    // 스크롤을 항상 가장 아래로 유지
    const messagesContainer = document.querySelector(".messages");
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, [messages]);

  const handleProfileImgClick = () => {
    // 프로필 이미지 클릭 시 상태 옵션 토글
    const statusOptions = document.getElementById("status-options");
    statusOptions.classList.toggle("active");
  };

  const handleStatusOptionClick = (status) => {
    // 상태 옵션 클릭 시 해당 상태로 프로필 이미지 업데이트
    const profileImg = document.getElementById("profile-img");
    const statusOnline = document.getElementById("status-online");
    const statusAway = document.getElementById("status-away");
    const statusBusy = document.getElementById("status-busy");
    const statusOffline = document.getElementById("status-offline");

    profileImg.className = "";

    statusOnline.classList.remove("active");
    statusAway.classList.remove("active");
    statusBusy.classList.remove("active");
    statusOffline.classList.remove("active");

    const selectedStatus = document.getElementById(
      `status-${status.toLowerCase()}`
    );
    selectedStatus.classList.add("active");

    switch (status) {
      case "Online":
        profileImg.classList.add("online");
        break;
      case "Away":
        profileImg.classList.add("away");
        break;
      case "Busy":
        profileImg.classList.add("busy");
        break;
      case "Offline":
        profileImg.classList.add("offline");
        break;
      default:
        break;
    }

    const statusOptions = document.getElementById("status-options");
    statusOptions.classList.remove("active");
  };

  function newMessage() {
    const messageInput = document.querySelector(".message-input input");
    const message = messageInput.value.trim();

    if (message === "") {
      return false;
    }

    const messagesList = document.querySelector(".messages ul");

    const newMessageElement = document.createElement("li");
    newMessageElement.className = "sent";
    newMessageElement.innerHTML = `<img src="./images/profile.png" alt="" /><p>${message}</p>`;
    messagesList.appendChild(newMessageElement);

    messageInput.value = null;

    const activeContactPreview = document.querySelector(
      ".contact.active .preview"
    );
    if (activeContactPreview) {
      activeContactPreview.innerHTML = `<span>You: </span>${message}`;
    }

    const messagesContainer = document.querySelector(".messages");
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    // 엔터 키를 누를 때 새로운 메시지 추가
    if (e.which === 13) {
      newMessage();
      e.preventDefault();
    }
  };

  const newGame = (e) => {
    console.log(123);
  };

  return (
    <div id="frame">
      <div id="sidepanel">
        <div id="profile">
          <div className="wrap">
            <img
              id="profile-img"
              src="./images/profile.png"
              className="online"
              alt=""
              onClick={handleProfileImgClick}
            />
            <p>이하름</p>
            <div id="status-options">
              <ul>
                <li
                  id="status-online"
                  className="active"
                  onClick={() => handleStatusOptionClick("Online")}
                >
                  <span className="status-circle"></span>
                  <p>접속중</p>
                </li>
                <li
                  id="status-away"
                  className="active"
                  onClick={() => handleStatusOptionClick("Away")}
                >
                  <span className="status-circle"></span>
                  <p>자리비움</p>
                </li>
                <li
                  id="status-busy"
                  className="active"
                  onClick={() => handleStatusOptionClick("Busy")}
                >
                  <span className="status-circle"></span>
                  <p>방해금지</p>
                </li>
                <li
                  id="status-offline"
                  className="active"
                  onClick={() => handleStatusOptionClick("Offline")}
                >
                  <span className="status-circle"></span>
                  <p>오프라인</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p id="listText">내친구목록</p>
        <div id="search">
          <i className="bi bi-search"></i>
          <input type="text" placeholder="친구찾기" />
        </div>
        <div id="contacts">
          <ul>{/* 연락처 목록 */}</ul>
        </div>
      </div>

      <div id="roomPanel">
        <div id="roomSelec">
          <div>
            <button className="roomCreateBtn">채팅방 만들기</button>
          </div>
          <div className="wrap1">
            <button className="wrapBtn">모임방1</button>
            <p className="wrapNum">1</p>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="contact-profile">
          <img id="profile-img" src="./images/profile.png" alt="" />
          <p className="contentName">모임방1</p>
          <i className="bi bi-pencil-square"></i>
          <div className="chatSetting">
            <i className="bi bi-person-plus-fill"></i>
            <i className="bi bi-person-lines-fill"></i>
          </div>
        </div>
        <div className="messages">
          <ul>{/* 메시지 목록 */}</ul>
        </div>
        <div className="message-input">
          <div className="wrap">
            <input
              type="text"
              placeholder="메세지를 입력하세요."
              value={messageInput}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
            />
            <div className="btnContact">
              <button className="submit" onClick={newMessage}>
                <i className="bi bi-send"></i>
              </button>
              <button className="game" onClick={newGame}>
                <i className="bi bi-controller"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatClient;
