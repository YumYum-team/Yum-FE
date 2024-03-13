import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { Logo, google, kakao, naver } from "../../assets/images";

const User = {
  email: "test123@test.com",
  password: "test123@",
};

export default function LoginPage() {
  const navigate = useNavigate();

  const [id, setid] = useState("");
  const [password, setPassword] = useState("");
  const [idValid, setidValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [notNext, setNotNext] = useState(false);

  const loginHandler = () => {
    if (id === User.id && password === User.password) {
      navigate("/"); //알림 없애고 메인페이지로 이동하게 하기
    } else {
      alert("등록되지 않은 회원입니다.");
    }
    setid("");
    setPassword("");
    setNotNext(true);
  };

  const LoginidHandler = (event) => {
    setid(event.target.value);
    const regex = /[a-zA-Z0-9._%+-]/;
    if (regex.test(event.target.value)) {
      setidValid(true);
    } else {
      setidValid(false);
    }
  };

  const LoginPasswordHandler = (event) => {
    setPassword(event.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(event.target.value)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
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
            value={id}
            onChange={LoginidHandler}
          />
        </div>
        <div className="errorMessageWrap">
          {!idValid && id.length > 0 && (
            <div>올바른 이메일을 입력해주세요.</div>
          )}
        </div>
        <div className="login-group">
          <input
            className="login-password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={LoginPasswordHandler}
          />
        </div>
        <div className="errorMessageWrap">
          {!passwordValid && password.length > 0 && (
            <div>영문, 숫자, 특수문자 포함 8자 이상 입력하세요.</div>
          )}
        </div>
        <button
          className="loginSumbit"
          disabled={notNext}
          onClick={loginHandler}
        >
          로그인
        </button>
        <div>
          <span>
            <button
              className="LoginAdd-in"
              onClick={() => navigate("/LoginAdd")}
              type="button"
            >
              회원가입
            </button>
          </span>
          <span>
            <button
              className="FoundId-in"
              onClick={() => navigate("/FoundId")}
              type="button"
            >
              아이디 찾기
            </button>
          </span>
          <span>
            <button
              className="FoundPassword-in"
              onClick={() => navigate("/FoundPassword")}
              type="button"
            >
              비밀번호 찾기
            </button>
          </span>
        </div>
        <div className="line">다른 계정으로 로그인</div>
        <div className="social-login-icons">
          <a href="">
            <img src={google} alt="Google" />
          </a>
          <a href="">
            <img src={kakao} alt="Kakao" />
          </a>
          <a href="">
            <img src={naver} alt="naver" />
          </a>
        </div>
      </div>
    </div>
  );
}
