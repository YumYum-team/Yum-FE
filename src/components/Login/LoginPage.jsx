import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { Logo, google, kakao, naver } from "../../assets/images";

function LoginPage() {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [idValid, setIdValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [notNext, setNotNext] = useState(false);

  const REST_API_KEY = "24f02abbba4b1f9eb550023d7b47a31d";
  const REDIRECT_URI = "http://localhost:3000/kakao/callback";
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = async () => {
    const formData = new FormData();
    formData.append("loginId", loginId);
    formData.append("password", password);
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Login failed");
      navigate("/");
    } catch (error) {
      alert("로그인 정보를 다시 확인해 주세요.");
    }
  };

  const handlekakaoClick = () => {
    window.location.href = link;
  };

  useEffect(() => {
    setNotNext(!(idValid && passwordValid));
  }, [idValid, passwordValid]);

  return (
    <div className="container">
      <div className="login-box">
        <div className="login-logo">
          <img src={Logo} alt="Logo" onClick={() => navigate("/")} />
        </div>
        <div className="login-group">
          <input
            className="login-id"
            type="text"
            placeholder="아이디"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
          <input
            className="login-id"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="loginSumbit" onClick={loginHandler}>
            로그인
          </button>
        </div>
        <div className="button">
          <button
            className="LoginAdd-in"
            onClick={() => navigate("/LoginAdd")}
            type="button"
          >
            회원가입
          </button>
          <button
            className="FoundId-in"
            onClick={() => navigate("/FoundId")}
            type="button"
          >
            아이디 찾기
          </button>
          <button
            className="FoundPassword-in"
            onClick={() => navigate("/FoundPassword")}
            type="button"
          >
            비밀번호 찾기
          </button>
        </div>
        <div className="line">다른 계정으로 로그인</div>
        <div className="social-login-icons">
          <a href="">
            <img src={google} alt="Google" />
          </a>
          <button className="social-login" onClick={handlekakaoClick}>
            <img src={kakao} alt="Kakao" />
          </button>
          <a href="">
            <img src={naver} alt="naver" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
