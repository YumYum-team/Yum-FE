// import React from "react";

// const MapPage = () => {
//   return <div></div>;
// };

// export default MapPage;

// import React from "react";

// const MapPage = () => {
//   return <div></div>;
// };

// export default MapPage;

import React, { useState } from "react";

function Accordion() {
  const [foodOptionsOpen, setFoodOptionsOpen] = useState(false);
  const [locationOptionsOpen, setLocationOptionsOpen] = useState(false);
  const [priceOptionsOpen, setPriceOptionsOpen] = useState(false);
  const [selectedFoodOptions, setSelectedFoodOptions] = useState([]);
  const [selectedLocationOption, setSelectedLocationOption] = useState("");
  const [selectedPriceOption, setSelectedPriceOption] = useState("");
  const [foodSearchQuery, setFoodSearchQuery] = useState("");
  const [locationSearchQuery, setLocationSearchQuery] = useState("");

  const toggleFoodOptions = () => {
    setFoodOptionsOpen(!foodOptionsOpen);
  };

  const toggleLocationOptions = () => {
    setLocationOptionsOpen(!locationOptionsOpen);
  };

  const togglePriceOptions = () => {
    setPriceOptionsOpen(!priceOptionsOpen);
  };

  const handleFoodOptionChange = (option) => {
    const isSelected = selectedFoodOptions.includes(option);
    if (isSelected) {
      setSelectedFoodOptions(
        selectedFoodOptions.filter((item) => item !== option)
      );
    } else {
      setSelectedFoodOptions([...selectedFoodOptions, option]);
    }
  };

  const handleLocationOptionChange = (option) => {
    setSelectedLocationOption(option);
  };

  const handlePriceOptionChange = (option) => {
    setSelectedPriceOption(option);
  };

  const handleFoodSearchChange = (event) => {
    setFoodSearchQuery(event.target.value);
  };

  const handleLocationSearchChange = (event) => {
    setLocationSearchQuery(event.target.value);
  };

  const handleFoodSearchSubmit = () => {
    // 검색 버튼 클릭 시 여기에 검색 동작 추가
    // 여기서는 검색 기능이 따로 구현되어 있지 않으므로 사용자가 입력한 검색어를 state에 반영하는 것만 구현함
    console.log("음식 종류 검색: ", foodSearchQuery);
  };

  const filterOptions = (options, searchQuery) => {
    return options.filter((option) =>
      option.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: "10px" }}>
          <div>
            <button>저장한 장소</button>
          </div>
          <input
            type="text"
            placeholder="음식 종류 검색"
            value={foodSearchQuery}
            onChange={handleFoodSearchChange}
          />
          <button onClick={handleFoodSearchSubmit}>검색</button>
        </div>
        <h2 onClick={toggleFoodOptions}>음식종류</h2>
        {foodOptionsOpen && (
          <div>
            {filterOptions(["일식", "중식", "양식"], foodSearchQuery).map(
              (option, index) => (
                <div key={index}>
                  <label>
                    <input
                      type="checkbox"
                      value={option}
                      checked={selectedFoodOptions.includes(option)}
                      onChange={() => handleFoodOptionChange(option)}
                    />
                    {option}
                  </label>
                </div>
              )
            )}
          </div>
        )}
      </div>
      <div style={{ flex: 1 }}>
        <h2 onClick={toggleLocationOptions}>위치</h2>
        {locationOptionsOpen && (
          <div>
            {filterOptions(
              ["250km", "500km", "1000km"],
              locationSearchQuery
            ).map((option, index) => (
              <div key={index}>
                <label>
                  <input
                    type="radio"
                    value={option}
                    checked={selectedLocationOption === option}
                    onChange={() => handleLocationOptionChange(option)}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        )}
        <h2 onClick={togglePriceOptions}>가격대</h2>
        {priceOptionsOpen && (
          <div>
            <label>
              <input
                type="radio"
                value="~2만원"
                checked={selectedPriceOption === "~2만원"}
                onChange={() => handlePriceOptionChange("~2만원")}
              />
              ~2만원
            </label>
            <br />
            <label>
              <input
                type="radio"
                value="2~4만원"
                checked={selectedPriceOption === "2~4만원"}
                onChange={() => handlePriceOptionChange("2~4만원")}
              />
              2~4만원
            </label>
            <br />
            <label>
              <input
                type="radio"
                value="4~6만원"
                checked={selectedPriceOption === "4~6만원"}
                onChange={() => handlePriceOptionChange("4~6만원")}
              />
              4~6만원
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

export default Accordion;
