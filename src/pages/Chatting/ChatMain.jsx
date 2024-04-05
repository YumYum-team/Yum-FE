import React, { useState, useEffect } from "react";
// import WebSocketHandler from "./WebSocket";
import "./ChatMain.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import profileImage from "../../assets/images/profile.png";
import profileImage2 from "../../assets/images/mainLogo.png";
import profileImage3 from "../../assets/images/textLogo.png";
import profileImage4 from "../../assets/images/webLogo.png";
import profileImage5 from "../../assets/images/profile2.png";

const serverURL = "http://138.2.122.249:8080";
// const currentUserId = "사용자ID";

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
  const [editedRoomId, setEditedRoomId] = useState("");
  const [invitedFriends, setInvitedFriends] = useState([]);
  const [isInvitedFriendsModalOpen, setIsInvitedFriendsModalOpen] =
    useState(false);
  const [editedTitle, setEditedTitle] = useState("");
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

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `${serverURL}/api/chatroom/${selectedRoomContent.chatroomId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editedName.trim() !== "" ? editedName : profileName,
            image: selectedImage,
            title: editedTitle.trim() !== "" ? editedTitle : profileName,
          }),
        }
      );
      if (response.ok) {
        console.log("채팅방 정보변경 성공");
        handleEditModalClose();
      } else {
        console.error("채팅방 정보변경 실패");
      }
    } catch (error) {
      console.error("에러", error);
    }
  };

  const openInvitedFriendsModal = () => {
    setIsInvitedFriendsModalOpen(true);
  };
  const closeInvitedFriendsModal = () => {
    setIsInvitedFriendsModalOpen(false);
  };

  const handleInviteFriends = () => {
    const invitedFriendsList = MyFilteredFriends.filter((friend) =>
      selectedFriends.includes(friend.memberId)
    );
    setInvitedFriends(invitedFriendsList);
  };

  // useEffect(() => {
  //   WebSocketHandler.connect();
  // }, []);

  useEffect(() => {
    const messagesContainer = document.querySelector(".messages");
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    fetchFriendList();
    fetchMyFriendList();
  }, [messages]);

  const fetchFriendList = async () => {
    try {
      const response = await fetch(`${serverURL}/api/members`);
      const data = await response.json();

      const formattedData = data.map((member) => ({
        memberId: member.id,
        name: member.memberName,
        email: member.loginId,
        profilePicture: profileImage2,
        // profilePicture: `${serverURL}/api/members/${member.id}/profile-picture`,
      }));
      setFriendList(formattedData);
      setFilteredFriends(formattedData);
    } catch (error) {
      console.error("Error fetching friend list:", error);
    }
  };

  const fetchMyFriendList = async () => {
    try {
      const response = await fetch(`${serverURL}/api/${memberId}/friends`);
      const data = await response.json();

      if (Array.isArray(data)) {
        const formattedData = data.map((friend) => ({
          memberId: friend.id,
          name: friend.memberName,
          email: friend.loginId,
          profilePicture: profileImage2,
        }));
        setMyFriendList(formattedData);
        setMyFilteredFriends(formattedData);
      } else {
        console.error("친구 목록이 배열 형태가 아닙니다.");
      }
    } catch (error) {
      console.error("에러", error);
    }
  };

  const addFriend = async (memberId) => {
    try {
      const response = await fetch(`${serverURL}/api/${memberId}/friend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          friendshipId: memberId,
        }),
      });
      if (response.ok) {
        console.log("친구 추가 성공");
        fetchMyFriendList();
      } else {
        console.error("친구 추가 실패");
      }
    } catch (error) {
      console.error("친구 추가 오류:", error);
    }
  };

  const handleRemoveFriend = async (memberId) => {
    try {
      const response = await fetch(`${serverURL}/api/${memberId}/friend`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          friendshipId: memberId,
        }),
      });

      if (response.ok) {
        console.log("친구 삭제 성공");
        fetchMyFriendList();
      } else {
        console.error("친구 삭제 실패");
      }
    } catch (error) {
      console.error("친구 삭제 중 오류 발생:", error);
    }
  };

  const fetchRoomMembers = async (chatroomId) => {
    try {
      const response = await fetch(
        `${serverURL}/api/chatroom/${chatroomId}/members`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("에러", error);
      return null;
    }
  };

  const handleLeaveRoom = async (memberId) => {
    try {
      const requestBody = {
        memberId: memberId,
        chatroomId: selectedRoomContent.chatroomId,
      };

      const response = await fetch(`${serverURL}/api/chatroom`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        leaveRoom(selectedRoomContent.name);
        console.log("채팅방 나가기 성공");
      } else {
        console.error("채팅방 나가기 실패");
      }
    } catch (error) {
      console.error("에러", error);
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

  const fetchChatRoomInfo = async () => {
    try {
      const response = await fetch(`${serverURL}/api/chatroom`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const createNewRoom = async () => {
    if (newTitle.trim() !== "") {
      const chatRoomInfo = await fetchChatRoomInfo();
      if (chatRoomInfo) {
        const formData = {
          title: newTitle,
          profile: selectedImage,
          memberIds: invitedFriends.map((friend) => friend.memberId),
        };
        try {
          const response = await fetch(`${serverURL}/api/chatroom`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            console.log("새로운 채팅방을 성공적으로 생성했습니다.");
            closeModal();
            handleInviteFriends();
          } else {
            console.error("새로운 채팅방을 생성하는데 실패했습니다.");
          }
        } catch (error) {
          console.error(
            "새로운 채팅방을 생성하는 중 오류가 발생했습니다:",
            error
          );
        }
      } else {
        console.error("서버로부터 채팅방 정보를 가져오는데 실패했습니다.");
      }
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
      const response = await fetch(`${serverURL}/api/chatroom/${title}`);
      const data = await response.json();

      setRoomMessages((prevMessages) => ({
        ...prevMessages,
        [title]: data,
      }));
      setSelectedRoomMessages(data);

      const roomMembers = await fetchRoomMembers(title);
      if (roomMembers) {
        setInvitedFriends(roomMembers);
      }
    } catch (error) {
      console.error("에러", error);
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
    console.log("dddd");
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
          <i className="bi-search"></i>
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
                        <span onClick={() => addFriend(friend.memberId)}>
                          친구 추가
                        </span>{" "}
                        /{" "}
                        <span
                          onClick={() => handleRemoveFriend(friend.memberId)}
                        >
                          친구 삭제
                        </span>
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
              {MyFilteredFriends.map((friend) => (
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
            {MyFilteredFriends.map((friend) => (
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
              className="bi-person-lines-fill"
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
                  {MyFilteredFriends.map((friend) => (
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
                <i className="bi-send"></i>
              </button>
              <button className="game" onClick={newGame}>
                <i className="bi-controller"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatMain;
