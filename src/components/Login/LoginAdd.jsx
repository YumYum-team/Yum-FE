import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginAdd.css";
import { leftArrow } from "../../assets/images";
import AuthenticationModal from "./Modal/AuthenticationModal";

function LoginAdd() {
  const navigate = useNavigate();

  const [loginId, setLoginId] = useState("");
  const [email, setEmail] = useState("");
  const [memberName, setMemberName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [message, setMessage] = useState("");

  const [showModal, setShowModal] = useState();

  const validateInput = () => {
    // 아이디 유효성 검사
    let idCheck = /^[a-z]+[a-z0-9]{5,19}$/g;
    if (!idCheck.test(loginId)) {
      alert("아이디는 영문자로 시작하는 6~20자 영문자 또는 숫자이어야 합니다.");
      return false;
    }

    // 이메일 입력 확인
    if (email === "") {
      alert("이메일을 입력해주세요.");
      return false;
    }

    // 비밀번호 유효성 검사
    const pwdCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!pwdCheck.test(password)) {
      alert(
        "비밀번호는 문자, 숫자, 기호를 조합하여 8자리 이상을 입력해주세요."
      );
      return false;
    }

    // 비밀번호 일치 확인
    if (password !== confirmPassword) {
      alert("비밀번호가 다릅니다. 다시 입력해주세요.");
      return false;
    }

    // 이름 한글 유효성 검사
    const korean = /^[가-힣]+$/;
    if (!korean.test(memberName)) {
      alert("이름은 한글만 입력할 수 있습니다.");
      return false;
    }

    // 전화번호 유효성 검사
    const tel = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if (!tel.test(phoneNum)) {
      alert("전화번호는 11자리로된 숫자로만 입력해주세요.");
      return false;
    }
    return true;
  };

  const requestSignUp = async (formData) => {
    const response = await fetch(
      "http://138.2.122.249:8080/auth/join?loginId=string&password=string&memberName=string&phoneNum=string",
      {
        method: "POST",
        body: formData,
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response;
  };

  const initSignUpList = async (event) => {
    event.preventDefault();
    if (!validateInput()) return;

    const fullEmail = `${loginId}@${email}`;
    const formData = new FormData();

    formData.append("loginId", fullEmail);
    formData.append("email", email);
    formData.append("memberName", memberName);
    formData.append("password", password);
    formData.append("phoneNum", phoneNum);

    try {
      await requestSignUp(formData);
    } catch (error) {
      alert("서버간의 통신오류로 인해 다시시도 해 주세요");
    }
    setShowModal(true);
  };

  return (
    <div className="container">
      <div className="Add-box">
        <form onSubmit={initSignUpList}>
          <div className="add-h1">
            <img
              src={leftArrow}
              alt="돌아가기"
              className="leftArrow"
              onClick={() => navigate("/login")}
            />
            <label>회원가입</label>
          </div>
          <div className="row-container">
            <input
              className="login"
              type="text"
              placeholder="아이디"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
            <span className="at">@</span>
            <input
              className="domain"
              type="text"
              name="userEmail"
              placeholder="domain.co.kr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login-admin">
            <input
              className="Add"
              type="text"
              placeholder="이름"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
            />
            <input
              className="Add"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="Add"
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className="Add"
              type="text"
              placeholder="전화번호 입력"
              pwd
              value={phoneNum}
              onChange={(e) => setPhoneNum(e.target.value)}
            />
          </div>
          <button type="submit" className="Add-up">
            회원가입
          </button>
        </form>
        {message && <div className="message">{message}</div>}
        {showModal && (
          <AuthenticationModal
            loginId={`${loginId}@${email}`}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
}

export default LoginAdd;
