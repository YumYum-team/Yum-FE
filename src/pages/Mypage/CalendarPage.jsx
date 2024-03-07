import React from "react";
import { ChevronLeft } from "react-bootstrap-icons";
import "./CalendarPage.css";
import { useNavigate } from "react-router-dom";

const CalendarPage = () => {
  const navigate = useNavigate();

  const backButtonHandler = () => {
    navigate("/mypage");
  };

  return (
    <div className="favorites">
      <button className="pageBack" onClick={backButtonHandler}>
        <ChevronLeft /> 달력
      </button>
    </div>
  );
};

export default CalendarPage;
