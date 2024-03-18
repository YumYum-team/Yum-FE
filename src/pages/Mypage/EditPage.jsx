import React, { useState, useEffect } from "react";
import { ChevronLeft, PencilSquare } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import "./EditPage.css";
import { profile } from "../../assets/images";

const EditPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    id: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
    name: "",
    profileImage: null,
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  useEffect(() => {
    // 유저 정보 가져오는 API 호출
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch("/api/user/profile", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
      } else {
        console.error("정보 불러오기 실패");
      }
    } catch (error) {
      console.error("정보 불러오기 실패:", error);
    }
  };

  const editBackButtonHandler = () => {
    navigate("/mypage");
  };

  const passwordChangeHandle = (e) => {
    const password = e.target.value;
    setUserInfo({
      ...userInfo,
      password: password,
    });

    if (password === "") {
      setPasswordError("");
    } else if (
      !password.match(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$`~!@$!%*#^?&()\-_=+])[a-zA-Z\d$`~!@$!%*#^?&()\-_=+]{8,20}$/
      )
    ) {
      setPasswordError("영문, 숫자, 특수문자 포함 8자 이상 입력하세요.");
    } else {
      setPasswordError("");
    }
  };

  const passwordConfirmChangeHandle = (e) => {
    const passwordConfirm = e.target.value;
    setUserInfo({
      ...userInfo,
      passwordConfirm: passwordConfirm,
    });

    if (passwordConfirm === "") {
      setPasswordMatchError("");
    } else if (passwordConfirm !== userInfo.password) {
      setPasswordMatchError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordMatchError("");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserInfo({
        ...userInfo,
        profileImage: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // 비밀번호 변경 요청 보내는 로직 추가
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
            <img src={userInfo.profileImage || profile} alt="profile" />
            <label htmlFor="fileUpload">
              <PencilSquare className="editProfileIcon" />
            </label>
            <input
              id="fileUpload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
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
                className="editTextBox"
                type="password"
                value={userInfo.password}
                onChange={passwordChangeHandle}
              ></input>
              {passwordError && <span className="error">{passwordError}</span>}
            </div>
            <div className="userInfo">
              <label className="textInfo">비밀번호 확인</label>
              <input
                className="editTextBox"
                type="password"
                value={userInfo.passwordConfirm}
                onChange={passwordConfirmChangeHandle}
              ></input>
              {passwordMatchError && (
                <span className="error">{passwordMatchError}</span>
              )}
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
              <button className="editButton" onClick={handleSubmit}>
                수정하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
