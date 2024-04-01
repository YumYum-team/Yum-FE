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
  const [currentDate, setCurrentDate] = useState(null);
  const [memoInput, setMemoInput] = useState("");
  const [showMemo, setShowMemo] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedMemoId, setSelectedMemoId] = useState(null);

  useEffect(() => {
    // 유저 정보 불러오기
    fetchUserInfo();
  }, []);

  const backButtonHandler = () => {
    navigate("/mypage");
  };

  const dateClickHandle = (arg) => {
    setCurrentDate(arg.dateStr);
    setShowMemo(true);
    fetchMemosForDate(arg.dateStr);
  };

  const memoChangeHandle = (e) => {
    setMemoInput(e.target.value);
  };

  const fetchUserInfo = () => {
    fetch("http://138.2.122.249:8080/userInfo")
      .then((response) => response.json())
      .then((data) => {
        // 유저 정보 처리
        console.log(data);
      })
      .catch((error) => console.error("Error fetching user info:", error));
  };

  const saveMemo = () => {
    if (currentDate && !editMode) {
      const newMemos = [...memos];
      const id = Date.now();
      newMemos.push({ id, date: currentDate, memo: memoInput });
      setMemos(newMemos);
      setMemoInput("");
      insertMemo({ id, date: currentDate, memo: memoInput });
    } else {
      updateMemo();
    }
  };

  const memoClickHandle = (memo) => {
    const clickedMemo = memos.find((m) => m.memo === memo);
    setSelectedMemoId(clickedMemo.id);
    setMemoInput(memo);
    setEditMode(true);
  };

  const updateMemo = () => {
    if (currentDate && memoInput) {
      const updatedMemos = memos.map((memo) => {
        if (memo.date === currentDate && memo.id === selectedMemoId) {
          return { ...memo, memo: memoInput };
        }
        return memo;
      });
      setMemos(updatedMemos);
      setMemoInput("");
      setEditMode(false);
      updateMemoAPI(selectedMemoId, memoInput);
    }
  };

  const deleteMemo = (id) => {
    const updatedMemos = memos.filter((memo) => memo.id !== id);
    setMemos(updatedMemos);
    deleteMemoAPI(id);
  };

  const fetchMemosForDate = (date) => {
    fetch(`http://138.2.122.249:8080/memos/${date}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) =>
        console.error(`Error fetching memos for date ${date}:`, error)
      );
  };

  const insertMemo = (memo) => {
    fetch("http://138.2.122.249:8080/v1/api/insertMemo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memo),
    })
      .then((response) => response.json())
      .then((data) => {
        // 메모 추가 응답 처리
        console.log(data);
      })
      .catch((error) => console.error("Error inserting memo:", error));
  };

  const updateMemoAPI = (id, memo) => {
    fetch("http://138.2.122.249:8080/v1/api/updateMemo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, memo }),
    })
      .then((response) => response.json())
      .then((data) => {
        // 메모 수정 응답 처리
        console.log(data);
      })
      .catch((error) => console.error("Error updating memo:", error));
  };

  const deleteMemoAPI = (id) => {
    fetch("http://138.2.122.249:8080/v1/api/deleteMemo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Error deleting memo:", error));
  };

  const memosForCurrentDate = memos.filter((memo) => memo.date === currentDate);

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

                content.addEventListener("mouseenter", () => {
                  content.style.cursor = "pointer";
                });

                content.addEventListener("mouseleave", () => {
                  content.style.cursor = "auto";
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
                        className="updateMemo"
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
