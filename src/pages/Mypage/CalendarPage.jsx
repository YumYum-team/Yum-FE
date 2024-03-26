import React, { useState } from "react";
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
  const [editMode, setEditMode] = useState(false); // 메모 수정 모드 여부
  const [selectedMemoId, setSelectedMemoId] = useState(null); // 선택된 메모의 ID 상태 추가

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
    if (currentDate && !editMode) {
      const newMemos = [...memos];
      const id = Date.now(); // 고유한 id 생성
      newMemos.push({ id, date: currentDate, memo: memoInput }); //기존메모, 새로운 메모 추가
      setMemos(newMemos);
      setMemoInput(""); // 메모 입력칸 초기화
    } else {
      editMemo();
    }
  };

  const memoClickHandle = (memo) => {
    const clickedMemo = memos.find((m) => m.memo === memo);
    setSelectedMemoId(clickedMemo.id); // 클릭된 메모의 ID를 저장
    setMemoInput(memo); // 메모 클릭시 메모 입력칸 아래로 표시
    setEditMode(true); // 수정 모드 활성화
  };

  const editMemo = () => {
    if (currentDate && memoInput) {
      // 현재 날짜와 메모 입력 값이 있는 경우에만 실행
      const updatedMemos = memos.map((memo) => {
        if (memo.date === currentDate && memo.id === selectedMemoId) {
          // 현재 날짜와 메모의 날짜가 일치하고 선택한 메모의 ID와 일치하는 경우에만 수정
          return { ...memo, memo: memoInput };
        }
        return memo;
      });
      setMemos(updatedMemos);
      setMemoInput(""); // 메모 입력칸 초기화
      setEditMode(false); // 수정 모드 비활성화
    }
  };

  const deleteMemo = (id) => {
    const updatedMemos = memos.filter((memo) => memo.id !== id);
    setMemos(updatedMemos);
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
                title: "🟡",
                date: memo.date,
                backgroundColor: "transparent",
                borderColor: "transparent",
              }))}
              dayCellContent={(arg) => {
                const content = document.createElement("div");
                content.textContent = arg.dayNumberText;

                // 날짜 셀에 마우스를 올렸을 때
                content.addEventListener("mouseenter", () => {
                  content.style.cursor = "pointer"; // 커서 스타일 변경
                });

                // 날짜 셀에서 마우스를 떼었을 때
                content.addEventListener("mouseleave", () => {
                  content.style.cursor = "auto"; // 기본 커서로 변경
                });

                return { domNodes: [content] };
              }}
            />
          </div>
        </div>

        {showMemo && (
          <div className="rightSection">
            <div className="gameResultBox">
              <div className="gameResult">게임 결과</div>
              <img className="gameResultImage" src="{image}" alt="게임결과" />
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
                {editMode ? "수정" : "저장"}
              </button>
              <button
                className="closeButton"
                onClick={() => setShowMemo(false)}
              >
                <X />
              </button>
            </div>
            {currentDate && (
              <div className="memoListBox">
                <div className="memoList">메모목록({currentDate})</div>

                <ul className="memo">
                  {memosForCurrentDate.map((memo) => (
                    <li className="memo" key={memo.id}>
                      {memo.memo}

                      <button
                        className="editMemo"
                        onClick={() => memoClickHandle(memo.memo)}
                      >
                        수정
                      </button>
                      <button
                        className="deleteMemo"
                        onClick={() => deleteMemo(memo.id)}
                      >
                        삭제
                      </button>
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
