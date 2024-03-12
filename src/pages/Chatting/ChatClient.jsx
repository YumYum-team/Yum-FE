import React, { useState, useEffect } from "react";
import "./ChatClient.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import profileImage from "../../assets/images/profile.png";

const ChatClient = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const mockFriendList = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        profilePicture: profileImage,
      },
      {
        id: 2,
        name: "Jane Doe",
        email: "jane@example.com",
        profilePicture: profileImage,
      },
      {
        id: 3,
        name: "Doe",
        email: "jn@example.com",
        profilePicture: profileImage,
      },
      {
        id: 4,
        name: "Jane",
        email: "ja@example.com",
        profilePicture: profileImage,
      },
      {
        id: 5,
        name: "De",
        email: "j@example.com",
        profilePicture: profileImage,
      },
      {
        id: 6,
        name: "Jae",
        email: "j@example.com",
        profilePicture: profileImage,
      },
      {
        id: 7,
        name: "Doe",
        email: "jn@example.com",
        profilePicture: profileImage,
      },
    ];
    setFriendList(mockFriendList);
    setFilteredFriends(mockFriendList); // 초기에는 전체 목록을 보여주도록 설정
  }, []);

  useEffect(() => {
    const messagesContainer = document.querySelector(".messages");
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    fetchFriendList();
  }, [messages]);

  // 서버에서 FriendList를 가져오는 함수
  const fetchFriendList = async () => {
    try {
      const response = await fetch("친구목록api");
      const data = await response.json();
      setFriendList(data);
      setFilteredFriends(data); // 새로 받은 목록을 검색 결과에 반영
    } catch (error) {
      console.error("Error fetching friend list:", error);
    }
  };

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

    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const formattedTime = `${formattedHours}:${formattedMinutes}`;

    const newMessageElement = document.createElement("li");
    newMessageElement.className = "sent";
    newMessageElement.innerHTML = `
    <img src=${profileImage} alt="프로필" />
    <div class="message-content">
      <p>${message}</p>
      <span class="message-time">${formattedTime}</span>
    </div>
  `;
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

  const handleInputSearch = (e) => {
    const searchTerm = e.target.value.trim().toLowerCase();

    const filtered = friendList.filter(
      (friend) =>
        friend.name.toLowerCase().includes(searchTerm) ||
        friend.email.toLowerCase().includes(searchTerm)
    );

    setFilteredFriends(filtered);
    setSearchInput(e.target.value);
  };

  const handleInputKeyDown = (e) => {
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
              src={profileImage}
              alt="프로필 이미지"
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
          <input
            type="text"
            placeholder="친구찾기"
            value={searchInput}
            onChange={handleInputSearch}
          />
        </div>
        <div id="contacts">
          <div className="listGroup">
            <ul className="friend-list">
              {filteredFriends.map((friend) => (
                <li key={friend.id} className="friend-item">
                  <img src={friend.profilePicture} alt={friend.name} />
                  <div className="friend-info">
                    <p>{friend.name}</p>
                    <p>{friend.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
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
          <img id="profile-img" src={profileImage} alt="프로필 이미지" />
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
