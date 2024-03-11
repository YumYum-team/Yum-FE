import React, { useState } from "react";
import { ChevronLeft } from "react-bootstrap-icons";
import "./CalendarPage.css";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";

const CalendarPage = () => {
  const navigate = useNavigate();

  const backButtonHandler = () => {
    navigate("/mypage");
  };

  const dataClickHandle = (arg) => {
    alert(arg.dateStr);
  };

  return (
    <div className="favorites">
      <button className="pageBack" onClick={backButtonHandler}>
        <ChevronLeft /> 달력
      </button>

      <div className="calendarBox">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          dateClick={dataClickHandle}
          locale={koLocale}
          events={[]}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
