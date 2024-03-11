import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { leftArrow } from "../../assets/images";

const FoundPassword = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmailValidation = async () => {
    try {
      // 이메일 인증을 위해 서버 측에 이메일을 보냅니다.
      await axios.post("/api/send-email", { email });
      setIsEmailValid(true);
      setMessage("이메일이 인증되었습니다.");
    } catch (error) {
      console.error("이메일 인증 실패:", error);
      setIsEmailValid(false);
      setMessage("이메일을 인증할 수 없습니다.");
    }
  };

  const handlePasswordChangePage = () => {
    if (isEmailValid) {
      // 이메일이 인증되었으면 새 비밀번호 설정 페이지로 이동합니다.
      navigate("/change-password");
    } else {
      alert("이메일을 먼저 인증해주세요.");
    }
  };

  return (
    <div>
      <img src={leftArrow} alt="돌아가기" onClick={() => navigate("/login")} />
      <h2>비밀번호 찾기</h2>
      <form>
        <div>
          <input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="button" onClick={handleEmailValidation}>
            인증
          </button>
          {isEmailValid && <p>이메일이 인증되었습니다.</p>}
        </div>
      </form>
      <p>{message}</p>
      <button type="button" onClick={handlePasswordChangePage}>
        비밀번호 변경하기
      </button>
    </div>
  );
};

export default FoundPassword;
