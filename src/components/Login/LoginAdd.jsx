import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    } catch (error) {
      console.error("회원가입 실패:", error);
      setMessage("회원가입에 실패했습니다.");
    }
  };

  return (
    <div>
      <div>
        <img
          src={leftArrow}
          alt="돌아가기"
          onClick={() => navigate("/login")}
        />
        <h2>회원가입</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="아이디"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
          <button type="button" onClick={handleCheckLoginId}>
            중복 확인
          </button>
          {!isLoginIdValid && <p>이미 사용 중인 아이디입니다.</p>}
        </div>
        <div>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="button" onClick={handleCheckEmail}>
            중복 확인
          </button>
          {!isEmailValid && <p>이미 사용 중인 이메일입니다.</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="이름"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">회원가입</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default LoginAdd;
