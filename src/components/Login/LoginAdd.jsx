import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginAdd.css";
import axios from "axios";
import { leftArrow } from "../../assets/images";

const LoginAdd = () => {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [isLoginIdValid, setIsLoginIdValid] = useState(true); // 초기값을 true로 설정
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true); // 초기값을 true로 설정
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleCheckLoginId = async () => {
    try {
      // 아이디 중복 확인 요청
      // const response = await axios.post("/api/check-loginId", { loginId });
      // setIsLoginIdValid(response.data.valid);
      // 임시로 true로 설정합니다.
      setIsLoginIdValid(true);
      setMessage(""); // 메시지 초기화
    } catch (error) {
      console.error("아이디 중복 확인 실패:", error);
      setIsLoginIdValid(false);
      setMessage("아이디 중복 확인에 실패했습니다."); // 실패 메시지 설정
    }
  };

  const handleCheckEmail = async () => {
    try {
      // 이메일 중복 확인 요청
      // const response = await axios.post("/api/check-email", { email });
      // setIsEmailValid(response.data.valid);
      // 임시로 true로 설정합니다.
      setIsEmailValid(true);
      setMessage(""); // 메시지 초기화
    } catch (error) {
      console.error("이메일 중복 확인 실패:", error);
      setIsEmailValid(false);
      setMessage("이메일 중복 확인에 실패했습니다."); // 실패 메시지 설정
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 회원가입 요청
      await axios.post("/api/signup", {
        loginId,
        userName,
        email,
        password,
        confirmPassword,
      });
      setMessage("회원가입이 완료되었습니다.");
      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
      setMessage("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="container">
      <div className="Add-box">
        <form onSubmit={handleSubmit}>
          <div className="add-h1">
            <img
              src={leftArrow}
              alt="돌아가기"
              className="leftArrow"
              onClick={() => navigate("/login")}
            />
            <label>회원가입</label>
          </div>
          <div>
            <input
              className="Add-id"
              type="text"
              placeholder="아이디"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
            <button
              type="button"
              className="Add-check"
              onClick={handleCheckLoginId}
            >
              중복 확인
            </button>
            {!isLoginIdValid && (
              <p className="error-message">이미 사용 중인 아이디입니다.</p>
            )}
          </div>
          <div>
            <input
              className="Add-email"
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="button"
              className="Add-check"
              onClick={handleCheckEmail}
            >
              중복 확인
            </button>
            {!isEmailValid && (
              <p className="error-message">이미 사용 중인 이메일입니다.</p>
            )}
          </div>
          <div>
            <input
              className="Add-name"
              type="text"
              placeholder="이름"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <input
              className="Add-password"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              className="Add-passowrdcheck"
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="Add-up">
            회원가입
          </button>
        </form>
        <p className="error-message">{message}</p>
      </div>
    </div>
  );
};

export default LoginAdd;
