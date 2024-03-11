import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      // 서버 측에 이메일을 보내어 해당 이메일로 가입된 아이디를 찾습니다.
      const response = await axios.post("/api/find-id", { name, email });
      const userId = response.data.id; // 서버로부터 찾은 아이디를 받아옵니다.
      setMessage(`찾은 아이디는 ${userId}입니다.`);
    } catch (error) {
      console.error("아이디 찾기 실패:", error);
      setMessage("아이디를 찾을 수 없습니다.");
    }
  };

  const handleEmailValidation = async () => {
    try {
      // 이메일 인증을 위해 서버 측에 이메일을 보냅니다.
      await axios.post("/api/send-email", { email });
      setIsEmailValid(true);
      setMessage("인증 이메일을 전송했습니다.");
    } catch (error) {
      console.error("이메일 인증 실패:", error);
      setIsEmailValid(false);
      setMessage("이메일을 인증할 수 없습니다.");
    }
  };

  return (
    <div>
      <img src={leftArrow} alt="돌아가기" onClick={() => navigate("/login")} />
      <h2>아이디 찾기</h2>
      <form>
        <div>
          <input
            type="text"
            placeholder="이름"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="이메일"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="button" onClick={handleEmailValidation}>
            이메일 인증
          </button>
          {isEmailValid && <p>이메일이 인증되었습니다.</p>}
        </div>
        <button type="button" onClick={handleFindId}>
          아이디 찾기
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default FoundId;
