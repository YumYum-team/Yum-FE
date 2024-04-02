import React, { useState, useEffect } from "react";
import "./MyPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import { Modal, Button } from "react-bootstrap";
import {
  PersonPlusFill,
  PersonXFill,
  ChatRightTextFill,
  StarFill,
  Calendar,
  BoxArrowRight,
  ArrowReturnLeft,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { profile, webLogo } from "../../assets/images";

const MyPage = () => {
  const [inviteModal, setInviteModal] = useState(false);
  const [unregisterModal, setUnregisterModal] = useState(false);
  const [email, setEmail] = useState();
  const [profileImage, setProfileImage] = useState("");
  const [userId, setUserId] = useState();
  const [foundUser, setFoundUser] = useState(null);
  const [invitationSent, setInvitationSent] = useState({});
  const navigate = useNavigate();
  const [fetchState, setFetchState] = useState({ accessToken: null });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://138.2.122.249:8080/v1/api/myInfo",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${fetchState.accessToken}`,
            },
          }
        );
        if (response.ok) {
          const userData = await response.json();
          setEmail(userData.email);
          setProfileImage(userData.profileImage);
        } else {
          throw new Error("사용자 데이터를 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("사용자 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchUserData();
  }, []);

  const searchUser = async () => {
    try {
      const response = await fetch(
        "http://138.2.122.249:8080/v1/api/userIdSearch",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );
      if (response.ok) {
        const userData = await response.json();
        setFoundUser(userData);
      } else {
        setFoundUser(null);
      }
    } catch (error) {
      console.error("사용자 정보를 찾을 수 없습니다:", error);
      setFoundUser(null);
    }
  };

  const unregisterHandler = async () => {
    try {
      const response = await fetch(
        "http://138.2.122.249:8080/v1/api/deleteUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${fetchState.accessToken}`,
          },
          body: JSON.stringify({
            userId: userId,
          }),
        }
      );

      if (response.ok) {
        navigate("/");
      } else {
        throw new Error("사용자 탈퇴에 실패했습니다.");
      }
    } catch (error) {
      console.error("사용자 탈퇴 중 오류 발생:", error);
    }
  };

  const logoutButtonHandler = async () => {
    try {
      const response = await fetch("http://138.2.122.249:8080/auth/logout", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${fetchState.accessToken}`,
        },
      });

      if (response.ok) {
        navigate("/");
      } else {
        throw new Error("사용자 로그아웃에 실패했습니다.");
      }
    } catch (error) {
      console.error("사용자 로그아웃 중 오류 발생:", error);
    }
  };

  const inviteModalhHandler = () => {
    setInviteModal(true);
  };

  const inviteCloseHandler = () => {
    setInviteModal(false);
    setUserId("");
    setFoundUser(null);
  };

  // 초대 버튼 클릭 시 동작
  const inviteHandler = (user) => {
    // 초대하기 버튼을 눌렀을 때 초대 상태를 변경
    setInvitationSent((prevState) => ({
      ...prevState,
      [user]: !prevState[user],
    }));
    console.log("초대된 사용자:", user);
  };

  const editButtonHandler = () => {
    navigate("/edit");
  };

  const chatButtonHandler = () => {
    navigate("/Chat");
  };

  const favoriteButtonHandler = () => {
    navigate("/favorite");
  };

  const calendarButtonHandler = () => {
    navigate("/calendar");
  };

  const unregisterModalhHandler = () => {
    setUnregisterModal(true);
  };

  const unregisterCloseHandler = () => {
    setUnregisterModal(false);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchUser();
    }
  };

  return (
    <div className="myPage-box">
      <div className="left-section">
        <div className="profile-photo">
          {/* <img src={profileImage} alt="profile" /> */}
          {/* <div className="email">{email}</div> */}
          <img src={profile} alt="profile" />
        </div>
        <div className="email">test2580@naver.com</div>
        <button className="info-edit" onClick={editButtonHandler}>
          내정보수정
        </button>
      </div>

      <div className="right-section">
        <div className="myPage-button1">
          <button className="invite" onClick={inviteModalhHandler}>
            <PersonPlusFill />
            초대하기
          </button>

          {/*초대하기 모달*/}

          <Modal
            className="inviteModal"
            show={inviteModal}
            onHide={inviteCloseHandler}
          >
            <Modal.Header closeButton>
              <Modal.Title className="inviteTitle">친구 초대하기</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modalBody">
              {/* 검색된 사용자 표시 */}
              {foundUser && (
                <div className="userBox">
                  <span className="userprofile">
                    <img src={foundUser.profileImage} alt="프로필" />
                  </span>
                  <span className="searchId">{foundUser.userId}</span>
                  <Button
                    className="modalInvite"
                    onClick={() => inviteHandler(foundUser.id)}
                  >
                    {invitationSent[foundUser.id] ? "취소" : "초대하기"}
                  </Button>
                </div>
              )}
              {/* 사용자 없는 경우 메시지 표시 */}
              {!foundUser && userId && (
                <div className="notFoundMessage">
                  해당 사용자를 찾을 수 없습니다.
                </div>
              )}
              {/* 검색창 */}
              <div>
                <input
                  className="userIdSearch"
                  type="text"
                  placeholder="유저 ID를 입력하세요."
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                />
                <button className="userIdSearchButton" onClick={searchUser}>
                  <ArrowReturnLeft />
                </button>
              </div>
            </Modal.Body>
            <Modal.Footer className="inviteFooter">
              <Button className="modalInviteClose" onClick={inviteCloseHandler}>
                닫기
              </Button>
            </Modal.Footer>
          </Modal>

          <button className="chatting" onClick={chatButtonHandler}>
            <ChatRightTextFill />
            채팅
          </button>
          <button className="favorites" onClick={favoriteButtonHandler}>
            <StarFill />
            저장한장소
          </button>
          <button className="calendar" onClick={calendarButtonHandler}>
            <Calendar />
            달력
          </button>
        </div>
      </div>
      <div className="right-section2">
        <div className="myPage-button2">
          <button className="logout" onClick={logoutButtonHandler}>
            <BoxArrowRight />
            로그아웃
          </button>

          <button className="unregister" onClick={unregisterModalhHandler}>
            <PersonXFill /> 탈퇴하기
          </button>

          <Modal
            className="unregisterModal"
            show={unregisterModal}
            onHide={unregisterCloseHandler}
          >
            <Modal.Header className="modalUnregisterHeader" closeButton>
              <Modal.Title className="unregisterTitle">
                <img src={webLogo} alt="webLogo" />
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className="modalUnregisterBody">
              정말 탈퇴하시겠습니까?
            </Modal.Body>

            <Modal.Footer className="modalunregisterFooter">
              <Button
                className="modalUnregisterYes"
                onClick={unregisterHandler}
              >
                네
              </Button>
              <Button
                className="modalUnregisterNo"
                onClick={unregisterCloseHandler}
              >
                아니요
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
