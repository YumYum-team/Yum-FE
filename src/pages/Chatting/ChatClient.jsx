import React, { useState, useEffect } from "react";
import "./ChatClient.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import profileImage from "../../assets/images/profile.png";
import profileImage2 from "../../assets/images/mainLogo.png";
import profileImage3 from "../../assets/images/textLogo.png";
import profileImage4 from "../../assets/images/webLogo.png";
import profileImage5 from "../../assets/images/profile.png";

const ChatClient = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [chatRooms, setChatRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [selectedImage, setSelectedImage] = useState(profileImage);
  const [selectedRoomMessages, setSelectedRoomMessages] = useState([]);
  const [roomMessages, setRoomMessages] = useState({});
  const [selectedRoomContent, setSelectedRoomContent] = useState({});
  const [selectedFriends, setSelectedFriends] = useState([]);

  const images = [
    profileImage,
    profileImage2,
    profileImage3,
    profileImage4,
    profileImage5,
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  const handleFileSelectClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.addEventListener("change", handleImageSelect);
    fileInput.click();
  };

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
    ];
    setFriendList(mockFriendList);
    setFilteredFriends(mockFriendList);
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
      setFilteredFriends(data);
    } catch (error) {
      console.error("Error fetching friend list:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewRoomName(""); // 모달이 닫힐 때 새로운 방 이름 초기화
    setSelectedImage(null);
  };

  const createNewRoom = () => {
    if (newRoomName.trim() !== "") {
      const newRoom = {
        name: newRoomName,
        image: selectedImage,
        content: {},
      };
      if (selectedImage !== null) {
        newRoom.image = selectedImage;
      }
      setChatRooms((prevRooms) => [...prevRooms, newRoom]);
      closeModal();
    }
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRoomClick = (roomName) => {
    setContentRoom(roomName);
  };

  const setContentRoom = (roomName) => {
    const room = chatRooms.find((room) => room.name === roomName);
    if (room) {
      console.log("Room Image:", room.image);
      setNewRoomName(room.name);
      setSelectedImage(room.image || null);
      setSelectedRoomContent(room.content || {});

      fetchMessagesForRoom(roomName);
    }
  };

  const fetchMessagesForRoom = async (roomName) => {
    try {
      const response = await fetch(`서버 API 엔드포인트/${roomName}`);
      const data = await response.json();

      setRoomMessages((prevMessages) => ({
        ...prevMessages,
        [roomName]: data,
      }));
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleRoomCreateBtnClick = () => {
    if (isModalOpen) {
      closeModal();
    } else {
      openModal();
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

  const toggleFriend = (friendId) => {
    setSelectedFriends((prevSelected) => {
      if (prevSelected.includes(friendId)) {
        return prevSelected.filter((id) => id !== friendId);
      } else {
        return [...prevSelected, friendId];
      }
    });
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
            <button
              className="roomCreateBtn"
              onClick={handleRoomCreateBtnClick}
            >
              {"채팅방 만들기"}
            </button>
          </div>
          {chatRooms.map((room, index) => (
            <div
              key={index}
              className="wrap1"
              onClick={() => handleRoomClick(room.name)}
            >
              <button className="wrapBtn">{room.name}</button>
              <p className="wrapNum">{index}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="content">
        <div className="contact-profile">
          <img
            id="profile-img"
            src={selectedImage || profileImage}
            alt="프로필 이미지"
          />
          <p className="contentName">{newRoomName || ""}</p>
          <i
            className="bi bi-pencil-square"
            onClick={handleRoomCreateBtnClick}
          ></i>
          <div className="chatSetting">
            <i className="bi bi-person-plus-fill"></i>
            <i className="bi bi-person-lines-fill"></i>
          </div>
        </div>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <p>채팅방 만들기</p>
            </div>
            <div>
              {friendList.map((friend) => (
                <div key={friend.id}>
                  <input
                    type="checkbox"
                    id={friend.id}
                    checked={selectedFriends.includes(friend.id)}
                    onChange={() => toggleFriend(friend.id)}
                  />
                  <label htmlFor={friend.id}>
                    <img
                      className="modalFriendImg"
                      src={friend.profilePicture}
                      alt={friend.name}
                    />

                    {friend.name}
                    <br />
                    {friend.email}
                  </label>
                </div>
              ))}
            </div>
            <div>
              <div className="image-selection">
                {images.slice(0, 5).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index}`}
                    className={selectedImage === image ? "selected" : ""}
                    onClick={() => handleImageClick(image)}
                  />
                ))}
                <button
                  className="file-select-btn"
                  onClick={handleFileSelectClick}
                >
                  +
                </button>
              </div>
            </div>

            <input
              type="text"
              placeholder="채팅방 이름을 입력하세요."
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
            />
            <button onClick={createNewRoom}>확인</button>
            <button onClick={closeModal}>닫기</button>
          </div>
        )}

        <div className="messages">
          <ul>
            {selectedRoomMessages.map((message, index) => (
              <li
                key={index}
                className={message.sent ? "sent" : "received"}
              ></li>
            ))}
          </ul>
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
