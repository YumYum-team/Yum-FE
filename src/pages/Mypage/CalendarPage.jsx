import React, { useState, useEffect } from "react";
import { ChevronLeft, X } from "react-bootstrap-icons";
import "./CalendarPage.css";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";

const CalendarPage = () => {
  const navigate = useNavigate();
  const [memos, setMemos] = useState([]);
  const [currentDate, setCurrentDate] = useState(null); //현재 선택된 날짜 상태
  const [memoInput, setMemoInput] = useState(""); //메모 입력 값 상태
  const [showMemo, setShowMemo] = useState(false); //메모입력창을 숨기기 위한 상태 추가

  const backButtonHandler = () => {
    navigate("/mypage");
  };

  const dateClickHandle = (arg) => {
    setCurrentDate(arg.dateStr); //선택된 날짜 저장
    setShowMemo(true); //날짜 클릭시 메모 작성창 표시
  };

  const memoChangeHandle = (e) => {
    setMemoInput(e.target.value);
  };

  const saveMemo = () => {
    if (currentDate) {
      const newMemos = [...memos];
      newMemos.push({ date: currentDate, memo: memoInput }); //기존메모, 새로운 메모 추가
      setMemos(newMemos);
      setMemoInput(""); //메모 입력칸 초기화
    }
  };

  const memoClickHandle = (memo) => {
    setMemoInput(memo); //메모 클릭시 메모 입력칸 아래로 표시
  };

  const hideMemo = () => {
    setShowMemo(false); //x버튼 클릭시 메모 작성 창 숨기기
  };

  const memosForCurrentDate = memos.filter((memo) => memo.date === currentDate);
  //해당 날짜에 대한 메모 목록을 필터링하여 표시

  return (
    <div className="favorites">
      <button className="pageBack" onClick={backButtonHandler}>
        <ChevronLeft /> 달력
      </button>
      <div className="sectionBox">
        <div className="leftSection">
          <div className="calendarBox">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              dateClick={dateClickHandle}
              locale={koLocale}
              events={memos.map((memo) => ({
                title: "❤",
                date: memo.date,
                memo: memo.memo,
              }))}
              eventClick={(arg) =>
                memoClickHandle(arg.event.extendedProps.memo)
              }
              eventMouseEnter={() => (document.body.style.cursor = "pointer")}
              eventMouseLeave={() => (document.body.style.cursor = "auto")}
            />
          </div>
        </div>

        {showMemo && (
          <div className="rightSection">
            <div className="gameResultBox">
              <div className="gameResult">게임 결과</div>
              <img
                className="gameResultImage"
                src="c:\Users\Administrator\Desktop\화면 캡처 2024-03-21 184109.png "
                alt="양식"
              />
            </div>
            <div className="memoHeader">메모</div>
            <textarea
              className="memoInput"
              value={memoInput}
              onChange={memoChangeHandle}
              placeholder="메모를 입력하세요"
            />
            <div className="ButtonBox">
              <button className="saveButton" onClick={saveMemo}>
                저장
              </button>
              <button className="closeButton" onClick={hideMemo}>
                <X />
              </button>
            </div>
            {currentDate && (
              <div className="memoListBox">
                <div className="memoList">메모목록({currentDate})</div>
                <ul>
                  {memosForCurrentDate.map((memo, index) => (
                    <li key={index} onClick={() => memoClickHandle(memo.memo)}>
                      {memo.memo}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
