import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { profile, webLogo, user_icon } from "../../assets/images";

function Header() {
  return (
    <div className="Header">
      <div className="weblog">
        {/* 로고 링크 */}
        <Link to="/" className="logo-link">
          <img src={webLogo} alt="webLogo" />
        </Link>
      </div>
      <div className="profile">
        {/* 사용자 아이콘 링크 */}
        <Link to="/login" className="user_icons">
          <img src={user_icon} alt="user_icon" />
        </Link>
        {/* 프로필 링크 */}
        <Link to="/mypage" className="profile-link">
          <img src={profile} alt="profile" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
