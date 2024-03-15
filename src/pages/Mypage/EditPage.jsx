import React, { useState } from "react";
import { ChevronLeft, PencilSquare } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import "./EditPage.css";
import { profile } from "../../assets/images";

const EditPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "test@naver.com",
    id: "test",
    password: "",
    passwordConfirm: "",
    phoneNumber: "010-0000-0000",
    name: "테스트용",
  });

  const editBackButtonHandler = () => {
    navigate("/mypage");
  };

  const passwordChangeHandle = (e) => {
    setUserInfo({
      ...userInfo,
      password: e.target.value,
    });
  };
  const passwordConfirmChangeHandle = (e) => {
    setUserInfo({
      ...userInfo,
      passwordConfirm: e.target.value,
    });
  };

  return (
    <div className="editBox">
      <div className="editBackButton">
        <button className="editPageBack" onClick={editBackButtonHandler}>
          <ChevronLeft /> 내 정보 수정
        </button>
      </div>
      <div className="editSection">
        <div className="editLeftSection">
          <div className="editProfile">
            <img src={profile} alt="profile" />
            <PencilSquare className="editProdileIcon" />
          </div>
        </div>
        <div className="editRightSection">
          <div>
            <div className="userInfo">
              <label className="textInfo">이메일</label>
              <input
                className="textBox"
                type="email"
                value={userInfo.email}
                readOnly
              ></input>
            </div>
            <div className="userInfo">
              <label className="textInfo">아이디 </label>
              <input
                className="textBox"
                type="text"
                value={userInfo.id}
                readOnly
              ></input>
            </div>
            <div className="userInfo">
              <label className="textInfo">비밀번호 </label>
              <input
                className="textBox"
                type="password"
                value={userInfo.password}
                onChange={passwordChangeHandle}
              ></input>
            </div>
            <div className="userInfo">
              <label className="textInfo">비밀번호확인</label>
              <input
                className="textBox"
                type="password"
                value={userInfo.passwordConfirm}
                onChange={passwordConfirmChangeHandle}
              ></input>
            </div>
            <div className="userInfo">
              <label className="textInfo">전화번호</label>
              <input
                className="textBox"
                type="text"
                value={userInfo.phoneNumber}
                readOnly
              ></input>
            </div>
            <div className="userInfo">
              <label className="textInfo">이름</label>
              <input
                className="textBox"
                type="text"
                value={userInfo.name}
                readOnly
              ></input>
            </div>
            <div className="editButtonBox">
              <button className="editButton">수정하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
