import React, { useState, useEffect } from "react";
// import WebSocketHandler from "./WebSocket";
import "./ChatMain.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import profileImage from "../../assets/images/profile.png";
import profileImage2 from "../../assets/images/mainLogo.png";
import profileImage3 from "../../assets/images/textLogo.png";
import profileImage4 from "../../assets/images/webLogo.png";
import profileImage5 from "../../assets/images/profile2.png";

const ChatMain = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [MyFriendList, setMyFriendList] = useState([]);
  const [MyFilteredFriends, setMyFilteredFriends] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [modalSearchInput, setModalSearchInput] = useState("");
  const [chatRooms, setChatRooms] = useState([]);
  const [roomModalOpen, setRoomModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState(profileImage);
  const [selectedRoomMessages, setSelectedRoomMessages] = useState([]);
  const [roomMessages, setRoomMessages] = useState({});
  const [selectedRoomContent, setSelectedRoomContent] = useState({});
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedImage, setEditedImage] = useState("");
  const [editedName, setEditedName] = useState("");
  const [profileName, setProfileName] = useState("이름을설정해주세요");
  const [editedTitle, setEditedTitle] = useState("");
  const [invitedFriends, setInvitedFriends] = useState([]);
  const [isInvitedFriendsModalOpen, setIsInvitedFriendsModalOpen] =
    useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [modalDropdown, setModalDropdown] = useState(false);
  const [isInviteFriendsModalOpen, setIsInviteFriendsModalOpen] =
    useState(false);

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
    console.log("sssss");
  };

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleInviteFriendsModalOpen = () => {
    setIsInviteFriendsModalOpen(true);
  };

  const handleInviteFriendsModalClose = () => {
    setIsInviteFriendsModalOpen(false);
  };

  const handleSaveChanges = () => {
    if (editedName.trim() !== "") {
      setProfileName(editedName);
    }
    if (editedImage !== "") {
      setSelectedImage(editedImage);
    }
    if (editedTitle.trim() !== "") {
      setEditedTitle(editedTitle);
    }
    handleEditModalClose();
  };
  const openInvitedFriendsModal = () => {
    setIsInvitedFriendsModalOpen(true);
  };
  const closeInvitedFriendsModal = () => {
    setIsInvitedFriendsModalOpen(false);
  };

  const handleInviteFriends = () => {
    const invitedFriendsList = MyFriendList.filter((friend) =>
      selectedFriends.includes(friend.memberId)
    );
    setInvitedFriends(invitedFriendsList);
  };

  // useEffect(() => {
  //   WebSocketHandler.connect();
  // }, []);

  useEffect(() => {
    const mockFriendList = [
      {
        memberId: 1,
        name: "John Doe",
        email: "john@example.com",
        profilePicture: profileImage,
      },
      {
        memberId: 2,
        name: "Jane Doe",
        email: "jane@example.com",
        profilePicture: profileImage,
      },
      {
        memberId: 3,
        name: "Doe",
        email: "jn@example.com",
        profilePicture: profileImage,
      },
      {
        memberId: 4,
        name: "Jane",
        email: "ja@example.com",
        profilePicture: profileImage,
      },
      {
        memberId: 5,
        name: "De",
        email: "j@example.com",
        profilePicture: profileImage,
      },
      {
        memberId: 6,
        name: "Jae",
        email: "j@example.com",
        profilePicture: profileImage,
      },
    ];
    setFriendList(mockFriendList);
    setFilteredFriends(mockFriendList);
  }, []);

  useEffect(() => {
    const mockMyFriend = [
      {
        memberId: 7,
        name: "가나다",
        email: "ㄱㄴㄷ@example.com",
        profilePicture: profileImage,
      },
      {
        memberId: 8,
        name: "마바사",
        email: "ㅁㅂㅅ@example.com",
        profilePicture: profileImage,
      },
      {
        memberId: 9,
        name: "아자차",
        email: "ㅇㅈㅊ@example.com",
        profilePicture: profileImage,
      },
      {
        memberId: 15,
        name: "아아",
        email: "ㄱㄴㄷ@example.com",
        profilePicture: profileImage,
      },
      {
        memberId: 33,
        name: "하핳하",
        email: "ㅁㅂㅅ@example.com",
        profilePicture: profileImage,
      },
      {
        memberId: 27,
        name: "다다",
        email: "ㅇㅈㅊ@example.com",
        profilePicture: profileImage,
      },
      {
        memberId: 23,
        name: "하핳하",
        email: "ㅁㅂㅅ@example.com",
        profilePicture: profileImage,
      },
      {
        memberId: 55,
        name: "다다ㄷ다ㅏ",
        email: "ㅇㅈㅊ@example.com",
        profilePicture: profileImage,
      },
    ];
    setMyFriendList(mockMyFriend);
    setMyFilteredFriends(mockMyFriend);
  }, []);

  useEffect(() => {
    const messagesContainer = document.querySelector(".messages");
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    fetchFriendList();
  }, [messages]);

  // 서버 FriendList 가져오는
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
  const handleLeaveRoom = async () => {
    try {
      const response = await fetch(`서버 API 엔드포인트/leaveRoom`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 필요한 헤더 추가
        },
        body: JSON.stringify({
          // 채팅방 식별자 등 필요한 데이터 전송
          // 예: roomId, userId 등
        }),
      });

      if (response.ok) {
        leaveRoom(selectedRoomContent.name);
        console.log("Successfully left the room");
      } else {
        console.error("Failed to leave the room");
      }
    } catch (error) {
      console.error("Error leaving the room:", error);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const leaveRoom = (title) => {
    setChatRooms((prevRooms) => prevRooms.filter((room) => room !== title));
  };

  const openModal = () => {
    setRoomModalOpen(true);
  };

  const closeModal = () => {
    setRoomModalOpen(false);
    setNewTitle("");
    setSelectedImage(null);
  };

  const createNewRoom = () => {
    if (newTitle.trim() !== "") {
      const newRoom = {
        roomName: newTitle,
        image: selectedImage,
        content: {},
        invitedFriends: invitedFriends,
      };
      if (selectedImage !== null) {
        newRoom.image = selectedImage;
      }
      setChatRooms((prevRooms) => [...prevRooms, newRoom]);
      closeModal();
      handleInviteFriends();
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

  const handleRoomClick = (title) => {
    setContentRoom(title);
  };

  const setContentRoom = (title) => {
    const room = chatRooms.find((room) => room.roomName === title);
    if (room) {
      setNewTitle(room.roomName);
      setSelectedImage(room.image || null);
      setSelectedRoomContent(room.content || {});
      setSelectedRoomMessages(roomMessages[title] || []);
      fetchMessagesForRoom(title);
      setProfileName(room.roomName);
    }
  };

  const fetchMessagesForRoom = async (title) => {
    try {
      const response = await fetch(`서버 API 엔드포인트/${title}`);
      const data = await response.json();

      setRoomMessages((prevMessages) => ({
        ...prevMessages,
        [title]: data,
      }));
      setSelectedRoomMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleRoomCreateBtnClick = () => {
    if (selectedImage) {
      if (roomModalOpen) {
        closeModal();
      } else {
        setNewTitle("");
        openModal();
      }
    }
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

    setShowDropdown(filtered.length > 0 && searchTerm.length > 0);
  };
  const handleModalInputSearch = (e) => {
    const searchTerm = e.target.value.trim().toLowerCase();
    const filtered = friendList.filter(
      (friend) =>
        friend.name.toLowerCase().includes(searchTerm) ||
        friend.email.toLowerCase().includes(searchTerm)
    );
    setFilteredFriends(filtered);
    setModalSearchInput(e.target.value);

    setModalDropdown(filtered.length > 0 && searchTerm.length > 0);
  };

  const handleInputKeyDown = (e) => {
    if (e.which === 13) {
      newMessage();
      e.preventDefault();
    }
  };

  const newGame = () => {
    window.open("https://naver.me/5vBykG4L");
  };

  const toggleFriend = (friendId) => {
    setSelectedFriends((prevSelected) => {
      if (prevSelected.includes(friendId)) {
        return prevSelected.filter((memberId) => memberId !== friendId);
      } else {
        return [...prevSelected, friendId];
      }
    });
  };
  const handleFriendSelect = (friend) => {
    console.log("Selected friend:", friend);
  };

  return (
    <div id="frame">
      <div id="sidepanel">
        <p id="listText">내친구목록</p>
        <div id="search">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="친구찾기 (이름 or 이메일)"
            value={searchInput}
            onChange={handleInputSearch}
          />
        </div>

        {showDropdown && (
          <div className="search-dropdown">
            <ul className="friend-list">
              {filteredFriends.map((friend) => (
                <li
                  key={friend.memberId}
                  onClick={() => handleFriendSelect(friend)}
                  className="friend-item"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <img src={friend.profilePicture} alt={friend.name} />
                  <div className="friend-info">
                    <p>{friend.name}</p>
                    <p>{friend.email}</p>
                    {isHovered && (
                      <div>
                        <span>친구 추가</span> / <span>친구 삭제</span>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div id="contacts">
          <div className="MylistGroup">
            <ul className="MyFriendList">
              {MyFriendList.map((friend) => (
                <li key={friend.memberId} className="friend-item">
                  <img src={friend.profilePicture} alt={friend.name} />
                  <div className="MyFriendInfo">
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
              className="wrap"
              onClick={() => handleRoomClick(room.roomName)}
            >
              <button className="wrapBtn">{room.roomName}</button>
            </div>
          ))}
        </div>
      </div>
      {roomModalOpen && (
        <div className="chatModal">
          <div className="modal-content">
            <p>채팅방 만들기</p>
          </div>
          <div className="modalFriendList">
            {MyFriendList.map((friend) => (
              <div key={friend.memberId} className="modalFriendListItem">
                <input
                  type="checkbox"
                  id={friend.memberId}
                  checked={selectedFriends.includes(friend.memberId)}
                  onChange={() => toggleFriend(friend.memberId)}
                />
                <label htmlFor={friend.memberId}>
                  <img
                    className="modalFriendImg"
                    src={friend.profilePicture}
                    alt={friend.name}
                  />
                  {friend.name} : {friend.email}
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
            className="roomNameTextPlaceHolder"
            type="text"
            placeholder="채팅방 이름을 입력하세요."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button className="chatModalBtn" onClick={createNewRoom}>
            확인
          </button>
          <button className="chatModalBtn" onClick={closeModal}>
            닫기
          </button>
        </div>
      )}

      <div className="content">
        <div className="contact-profile">
          <img
            id="profile-img"
            src={selectedImage || profileImage}
            alt="프로필 이미지"
          />
          <p className="contentName">{editedName || newTitle}</p>
          <i className="bi bi-pencil-square" onClick={handleEditModalOpen}></i>
          <div className="chatSetting">
            <i
              className="bi bi-person-plus-fill"
              onClick={handleInviteFriendsModalOpen}
            ></i>
            <i
              onClick={openInvitedFriendsModal}
              className="bi bi-person-lines-fill"
            ></i>

            {isInvitedFriendsModalOpen && (
              <div className="chatModal">
                <div className="modal-content">
                  <p className="listP">채팅방 친구 목록</p>
                </div>
                <div className="modalFriendList2">
                  <label>
                    {invitedFriends.map((friend) => (
                      <label key={friend.id}>
                        <img src={friend.profilePicture} alt={friend.name} />
                        <div className="friend-info-label">
                          <span className="friend-name">{friend.name}</span>
                          <span className="friend-email">{friend.email}</span>
                        </div>
                      </label>
                    ))}
                  </label>
                </div>
                <button
                  className="roomListBtn"
                  onClick={closeInvitedFriendsModal}
                >
                  닫 기
                </button>
              </div>
            )}
            {isInviteFriendsModalOpen && (
              <div className="chatModal">
                <div className="modal-content">
                  <p>친구 초대하기</p>
                </div>
                <div className="modalFriendList">
                  {MyFriendList.map((friend) => (
                    <div key={friend.memberId} className="modalFriendListItem">
                      <input
                        type="checkbox"
                        id={`friend-${friend.memberId}`}
                        checked={selectedFriends.includes(friend.memberId)}
                        onChange={() => toggleFriend(friend.memberId)}
                      />
                      <label htmlFor={`friend-${friend.memberId}`}>
                        <img
                          className="modalFriendfImg"
                          src={friend.profilePicture}
                          alt={friend.name}
                        />
                        {friend.name} : {friend.email}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="modalInput">
                  <input
                    className="modalInputText"
                    type="text"
                    placeholder="친구찾기 (이름 or 이메일)"
                    value={modalSearchInput}
                    onChange={handleModalInputSearch}
                  />
                </div>
                {modalDropdown && (
                  <div className="modalSearchDropdown">
                    <ul className="friend-list">
                      {filteredFriends.map((friend) => (
                        <li
                          key={friend.memberId}
                          onClick={() => handleFriendSelect(friend)}
                          className="modalFriendItem"
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          <div className="modalFriendContainer">
                            <img
                              src={friend.profilePicture}
                              alt={friend.name}
                            />
                            <div className="modalFriendInfo">
                              {friend.name} : {friend.email}
                            </div>
                          </div>
                          <div>
                            {isHovered && (
                              <div className="inviteText">
                                <p>초대</p>
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="inviteBtn">
                  <button className="inviteBtn1" onClick={handleInviteFriends}>
                    초대하기
                  </button>
                  <button
                    className="inviteBtn2"
                    onClick={handleInviteFriendsModalClose}
                  >
                    닫 기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {isEditModalOpen && (
          <div className="chatModal">
            <div className="modal-content">
              <p>채팅방 정보 변경</p>
            </div>
            <div className="modal-img">
              <img
                className="modal-img2"
                src={selectedImage}
                alt="프로필 이미지"
              />
            </div>
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
            <input
              className="roomNameTextPlaceHolder"
              type="text"
              placeholder="변경 할 채팅방이름을 입력하세요"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <button className="chatModalBtn" onClick={handleSaveChanges}>
              저장
            </button>
            <button className="chatModalBtn" onClick={handleEditModalClose}>
              닫기
            </button>
            <div>
              <button className="chatLeaveBtn" onClick={handleLeaveRoom}>
                채팅방 나가기
              </button>
            </div>
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
export default ChatMain;
