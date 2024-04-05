import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FoundId.css";
import axios from "axios";
import { leftArrow } from "../../assets/images";

const FoundId = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [message, setMessage] = useState("");

  const handleFindId = async () => {
    try {
      const response = await axios.post("/api/find-id", { name, email });
      const userId = response.data.id;
      setMessage(`찾은 아이디는 ${userId}입니다.`);
    } catch (error) {
      console.error("아이디 찾기 실패:", error);
      setMessage("아이디를 찾을 수 없습니다.");
    }
  };

  const handleEmailValidation = async () => {
    try {
      await axios.post("/api/send-email", { email });
      setIsEmailValid(true);
      setMessage("인증 이메일을 전송했습니다.");
    } catch (error) {
      console.error("이메일 인증 실패:", error);
      setIsEmailValid(false);
      setMessage("이메일을 인증할 수 없습니다.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleFindId();
  };

  return (
    <div className="container">
      <div className="fi-box">
        <div className="fi-h1">
          <img
            className="leftArrow"
            src={leftArrow}
            alt="돌아가기"
            onClick={() => navigate("/login")}
          />
          <label>아이디 찾기</label>
        </div>
        <form onSubmit={handleSubmit}>

          <div className="find">
            <input
              className="fi-id"
              type="text"
              placeholder="이름"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <input
              className="fi-email"
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button
              className="fi-check"
              type="button"
              onClick={handleEmailValidation}
            >
              인증
            </button>
            {isEmailValid && <p>이메일이 인증되었습니다.</p>}
          </div>
          <button className="fi-bt" type="submit">
            아이디 찾기
          </button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default FoundId;
