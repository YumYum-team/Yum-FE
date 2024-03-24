import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";
import { leftArrow } from "../../assets/images";

const ChangePassword = () => {
  const [emailCode, setEmailCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    try {
      // 새 비밀번호를 서버에 전달하고 변경합니다.
      await axios.post("/api/change-password", { emailCode, newPassword });
      setMessage("비밀번호가 성공적으로 변경되었습니다.");
      navigate("/login");
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);
      setMessage("비밀번호를 변경할 수 없습니다.");
    }
  };

  return (
    <div className="container">
      <div className="cp-box">
        <div className="cp-h1">
          <img
            className="leftArrow"
            src={leftArrow}
            alt="돌아가기"
            onClick={() => navigate("/login")}
          />
          <label>비밀번호 변경</label>
        </div>
        <form>
          <div className="change-password">
            <input
              className="cp-email"
              type="text"
              placeholder="이메일 코드"
              id="emailCode"
              value={emailCode}
              onChange={(e) => setEmailCode(e.target.value)}
            />
            <input
              className="cp-passowrd"
              type="password"
              placeholder="새 비밀번호"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              className="cp-passowrdcheck"
              type="password"
              placeholder="새 비밀번호 확인"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            className="cp-bt"
            type="button"
            onClick={handleChangePassword}
          >
            비밀번호 변경하기
          </button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChangePassword;
