import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import webLogo from "../../assets/images/webLogo.png";
import profile from "../../assets/images/profile.png";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleProfileClick = () => {
    if (isLoggedIn) {
      window.location.href = "/mypage";
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <div className="Header">
      <div className="weblog">
        <Link to="/" className="logo-link">
          <img src={webLogo} alt="webLogo" />
        </Link>
      </div>
      <div className="profile">
        <button className="profile-link" onClick={handleProfileClick}>
          <img src={profile} alt="profile" />
        </button>
      </div>
    </div>
  );
}

export default Header;
