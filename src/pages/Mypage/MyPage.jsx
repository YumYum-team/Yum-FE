import React, { useState } from "react";
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
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { profile, webLogo } from "../../assets/images";

const MyPage = () => {
  const [inviteModal, setInviteModal] = useState(false);
  const [unregisterModal, setUnregisterModal] = useState(false);
  const [email, setEmail] = useState();
  const [userId, setUserId] = useState();
  const [invitationSent, setInvitationSent] = useState({});
  const navigate = useNavigate();

  const inviteModalhHandler = () => {
    setInviteModal(true);
  };

  const inviteCloseHandler = () => {
    setInviteModal(false);
  };

  const inviteHandler = (user) => {
    // 초대하기 버튼을 눌렀을 때 초대 상태를 변경
    setInvitationSent((prevState) => ({
      ...prevState,
      [user]: !prevState[user],
    }));
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

  const logoutButtonHandler = () => {
    navigate("/");
  };

  const unregisterModalhHandler = () => {
    setUnregisterModal(true);
  };

  const unregisterCloseHandler = () => {
    setUnregisterModal(false);
  };

  const unregisterHandler = () => {
    navigate("/");
    //네 버튼 선택시 메인페이지로 이동
  };

  return (
    <div className="myPage-box">
      <div className="left-section">
        <div className="profile-photo">
          <img src={profile} alt="profile" />
        </div>
        <div className="email">{email}test2580@naver.com</div>
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
              <div className="userBox">
                <span className="userprofile">
                  <img src={profile} alt="profile" />
                </span>
                <span className="searchId"> test1 </span>
                <Button
                  className="modalInvite"
                  onClick={() => inviteHandler("test1")}
                >
                  {invitationSent["test1"] ? "취소" : "초대하기"}
                </Button>
              </div>
              <div className="userBox">
                <span className="userprofile">
                  <img src={profile} alt="profile" />
                </span>
                <span className="searchId"> test2 </span>
                <Button
                  className="modalInvite"
                  onClick={() => inviteHandler("test2")}
                >
                  {invitationSent["test2"] ? "취소" : "초대하기"}
                </Button>
              </div>
              <input
                className="userIdSearch"
                type="text"
                placeholder="유저 ID를 입력하세요."
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
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
