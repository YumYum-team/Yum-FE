import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Email.css";

function Email() {
  const [loginId, setLoginId] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setLoginId(urlParams.get("loginId") || "");
    setEmail(urlParams.get("email") || "");
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Preparing form data
    const formData = new FormData();
    formData.append("authNum", authCode);
    formData.append("loginId", loginId);
    formData.append("email", email);

    try {
      const response = await fetch("/auth/auth-num", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        alert("인증번호가 다릅니다.");
        return;
      }

      const joinResponse = await fetch("/auth/join-confirm", {
        method: "POST",
        body: formData,
      });

      if (!joinResponse.ok) {
        alert(
          "서버와의 통신간에 오류가 발생하였습니다.\n잠시 후, 다시 시도해 주세요."
        );
        return;
      }

      alert("회원가입이 완료되었습니다.");
      navigate("/login"); // Navigate to login upon success
    } catch (error) {
      console.error("Failed to submit form:", error);
      alert("양식 제출 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="content">
      <div className="card">
        <h1 className="business-logo">회원가입</h1>
        <span className="title">이메일 인증</span>

        <div className="form-container">
          <form className="authentication-form" onSubmit={handleSubmit}>
            <div className="description-container">
              <p className="description">
                보안을 위해 본인 확인을 진행 합니다.
              </p>
              <p className="description">
                입력하신 이메일로 6자리 인증 코드를 메일로 전송했습니다.
              </p>
            </div>

            <div className="form-field">
              <span className="user-email" id="loginEmail">
                {email}
              </span>
              <div className="input-container">
                <input
                  className="input"
                  type="text"
                  id="userInput"
                  placeholder="인증 코드 입력"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                />
              </div>
            </div>
          </form>
        </div>

        <div className="button-section">
          <button className="text-button">취소</button>
          <button
            className="plain-button"
            id="next-button"
            onClick={handleSubmit}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default Email;
