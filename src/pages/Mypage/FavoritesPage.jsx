import React from "react";
import { ChevronLeft } from "react-bootstrap-icons";
import "./FavoritesPage.css";
import { useNavigate } from "react-router-dom";

const FavoritesPage = () => {
  const navigate = useNavigate();

  const backButtonHandler = () => {
    navigate("/mypage");
  };

  return (
    <div className="favorites">
      <button className="pageBack" onClick={backButtonHandler}>
        <ChevronLeft /> 저장한 장소
      </button>
    </div>
  );
};

export default FavoritesPage;
