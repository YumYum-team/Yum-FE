import React, { useState } from "react";
import "./MyPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PersonPlusFill } from "react-bootstrap-icons";
import { PersonXFill } from "react-bootstrap-icons";
import { ChatRightTextFill } from "react-bootstrap-icons";
import { StarFill } from "react-bootstrap-icons";
import { Calendar } from "react-bootstrap-icons";
import { BoxArrowRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { profile } from "../../assets/images";

const MyPage = () => {
  const [email, setEmail] = useState();
  const navigate = useNavigate();

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
          <button className="invite">
            <PersonPlusFill />
            초대하기
          </button>
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
          <button className="unregister">
            <PersonXFill /> 탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
