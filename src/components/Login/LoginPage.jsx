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

  const link = `https://kauth.kakao.com/oauth/authorize?client_id=&redirect_uri=&response_type=code`;

  const loginHandler = async () => {
    // FormData 대신 JSON 객체를 사용
    const loginData = {
      loginId: loginId,
      password: password
    };
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
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
