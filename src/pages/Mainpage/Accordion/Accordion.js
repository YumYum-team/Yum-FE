import React, { useState, useEffect } from "react";
import axios from "axios";
import { NaverMap, useNavermaps, Marker } from "react-naver-maps";
import "./Accordion.css";
// import RestaurantList from "./RestaurantList";
import { Link } from "react-router-dom";

function Accordion() {
  const [foodOptionsOpen, setFoodOptionsOpen] = useState(false);
  const [locationOptionsOpen, setLocationOptionsOpen] = useState(false);
  const [priceOptionsOpen, setPriceOptionsOpen] = useState(false);
  const [selectedFoodOptions, setSelectedFoodOptions] = useState([]);
  const [selectedLocationOption, setSelectedLocationOption] = useState("");
  const [selectedPriceOption, setSelectedPriceOption] = useState("");
  const [foodSearchQuery, setFoodSearchQuery] = useState("");
  const [locationSearchQuery, setLocationSearchQuery] = useState("");
  const [currentPosition, setCurrentPosition] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const navermaps = useNavermaps({
    ncpClientId: "ewq80h87fv",
  });

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

  // const handleSearch = async () => {
  //   try {
  //     const queryOptions = [];
  //     if (selectedFoodOptions.length > 0) {
  //       queryOptions.push(`category=${selectedFoodOptions.join(",")}`);
  //     }
  //     if (selectedLocationOption) {
  //       queryOptions.push(`radius=${selectedLocationOption}`);
  //     }
  //     if (selectedPriceOption) {
  //       queryOptions.push(`price=${selectedPriceOption}`);
  //     }
  //     const queryString = queryOptions.join("&");

  //     const response = await axios.get(
  //       `https://naveropenapi.apigw.ntruss.com/map-place/v1/search?query=${foodSearchQuery}&${queryString}`,
  //       {
  //         headers: {
  //           "X-NCP-APIGW-API-KEY-ID": "ewq80h87fv",
  //           "X-NCP-APIGW-API-KEY": "NeSWWtzTc4IRWrKmSxeZcYbEotM6MbMo708WPZtY",
  //         },
  //       }
  //     );

  //     console.log("검색 결과:", response.data);

  //     setRestaurants(response.data.places);

  //     // 여기에 검색 결과를 지도에 표시하는 코드를 추가할 수 있음
  //     // 예를 들어, NaverMap 컴포넌트의 marker나 overlay를 이용하여 표시할 수 있음
  //   } catch (error) {
  //     console.error("네이버 지도 API 오류:", error);
  //   }
  // };

  // useEffect(() => {
  //   const fetchLocation = async () => {
  //     try {
  //       const position = await getCurrentPosition();
  //       setCurrentPosition(position);
  //     } catch (error) {
  //       console.error("Error fetching location:", error);
  //     }
  //   };

  //   fetchLocation();
  // }, []);

  // const getCurrentPosition = () => {
  //   return new Promise((resolve, reject) => {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         resolve({
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         });
  //       },
  //       (error) => {
  //         reject(error);
  //       }
  //     );
  //   });
  // };

  // useEffect(() => {
  //   const loadNaverMap = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${currentPosition.lng},${currentPosition.lat}&output=json`,
  //         {
  //           headers: {
  //             "X-NCP-APIGW-API-KEY-ID": "ewq80h87fv",
  //             "X-NCP-APIGW-API-KEY": "NeSWWtzTc4IRWrKmSxeZcYbEotM6MbMo708WPZtY",
  //           },
  //         }
  //       );
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Error fetching Naver Map:", error);
  //     }
  //   };

  //   if (currentPosition && navermaps.loaded) {
  //     loadNaverMap();
  //   }
  // }, [currentPosition, navermaps.loaded]);

  return (
    <div>
      <div className="left">
        <div>
          <div className="starred">저장한 장소</div>
        </div>
        <div className="food" onClick={toggleFoodOptions}>
          음식 종류
        </div>
        {foodOptionsOpen && (
          <div className="food-option">
            <div>
              <label>
                <input
                  type="checkbox"
                  value="일식"
                  onChange={() => handleFoodOptionChange("일식")}
                />
                일식
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="중식"
                  onChange={() => handleFoodOptionChange("중식")}
                />
                중식
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="양식"
                  onChange={() => handleFoodOptionChange("양식")}
                />
                양식
              </label>
            </div>
          </div>
        )}
        <div className="place" onClick={toggleLocationOptions}>
          장소
        </div>
        {locationOptionsOpen && (
          <div className="place-option">
            {["250km", "500km", "1000km"].map((option, index) => (
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
        <div className="price" onClick={togglePriceOptions}>
          가격
        </div>
        {priceOptionsOpen && (
          <div className="price-option">
            {["2만원", "24만원", "4~6만원"].map((option, index) => (
              <div key={index}>
                <label>
                  <input
                    type="radio"
                    value={option}
                    checked={selectedPriceOption === option}
                    onChange={() => handlePriceOptionChange(option)}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        )}
        {/* 검색 버튼 */}
        <div className="button2">
          {/* <Link to="/RestaurantList/restaurant-list"> */}
          <button className="btn-search">검색</button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}

export default Accordion;

// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";

// function Accordion() {
//   const [selectedFoods, setSelectedFoods] = useState([]);
//   const [selectedDistance, setSelectedDistance] = useState(null);
//   const [selectedPriceRange, setSelectedPriceRange] = useState(null);
//   const [isFoodAccordionOpen, setIsFoodAccordionOpen] = useState(false);
//   const [isDistanceAccordionOpen, setIsDistanceAccordionOpen] = useState(false);
//   const [isPriceAccordionOpen, setIsPriceAccordionOpen] = useState(false);
//   const [searchResults, setSearchResults] = useState(null);

//   const history = useHistory();

//   const handleFoodSelection = (foodType) => {
//     if (selectedFoods.includes(foodType)) {
//       setSelectedFoods(selectedFoods.filter((food) => food !== foodType));
//     } else {
//       setSelectedFoods([...selectedFoods, foodType]);
//     }
//   };

//   const handleDistanceSelection = (distance) => {
//     setSelectedDistance(distance);
//   };

//   const handlePriceRangeSelection = (priceRange) => {
//     setSelectedPriceRange(priceRange);
//   };

//   const toggleFoodAccordion = () => {
//     setIsFoodAccordionOpen(!isFoodAccordionOpen);
//   };

//   const toggleDistanceAccordion = () => {
//     setIsDistanceAccordionOpen(!isDistanceAccordionOpen);
//   };

//   const togglePriceAccordion = () => {
//     setIsPriceAccordionOpen(!isPriceAccordionOpen);
//   };

//   const handleSearch = async () => {
//     try {
//       const response = await fetch("https://example.com/search", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           foods: selectedFoods,
//           distance: selectedDistance,
//           priceRange: selectedPriceRange,
//         }),
//       });
//       const data = await response.json();
//       setSearchResults(data);
//       // 여기서 검색 결과를 이용하여 다음 페이지로 이동하거나 결과를 표시할 수 있습니다.
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//     }
//   };

//   return (
//     <div>
//       <div>
//         <button onClick={toggleFoodAccordion}>
//           {isFoodAccordionOpen ? "음식 종류 숨기기" : "음식 종류 선택하기"}
//         </button>
//         {isFoodAccordionOpen && (
//           <div>
//             <AccordionItem
//               title="한식"
//               onSelected={handleFoodSelection}
//               selected={selectedFoods.includes("한식")}
//             />
//             <AccordionItem
//               title="중식"
//               onSelected={handleFoodSelection}
//               selected={selectedFoods.includes("중식")}
//             />
//             <AccordionItem
//               title="양식"
//               onSelected={handleFoodSelection}
//               selected={selectedFoods.includes("양식")}
//             />
//           </div>
//         )}
//       </div>
//       <div>
//         <button onClick={toggleDistanceAccordion}>
//           {isDistanceAccordionOpen ? "거리 숨기기" : "거리 선택하기"}
//         </button>
//         {isDistanceAccordionOpen && (
//           <div>
//             <AccordionItem
//               title="100km"
//               onSelected={handleDistanceSelection}
//               selected={selectedDistance === "100km"}
//             />
//             <AccordionItem
//               title="200km"
//               onSelected={handleDistanceSelection}
//               selected={selectedDistance === "200km"}
//             />
//             <AccordionItem
//               title="300km"
//               onSelected={handleDistanceSelection}
//               selected={selectedDistance === "300km"}
//             />
//           </div>
//         )}
//       </div>
//       <div>
//         <button onClick={togglePriceAccordion}>
//           {isPriceAccordionOpen ? "가격 숨기기" : "가격 선택하기"}
//         </button>
//         {isPriceAccordionOpen && (
//           <div>
//             <AccordionItem
//               title="~1만원"
//               onSelected={handlePriceRangeSelection}
//               selected={selectedPriceRange === "~1만원"}
//             />
//             <AccordionItem
//               title="1만원~2만원"
//               onSelected={handlePriceRangeSelection}
//               selected={selectedPriceRange === "1만원~2만원"}
//             />
//             <AccordionItem
//               title="3만원 이상"
//               onSelected={handlePriceRangeSelection}
//               selected={selectedPriceRange === "3만원 이상"}
//             />
//           </div>
//         )}
//       </div>
//       <div>
//         <button onClick={handleSearch}>검색</button>
//       </div>
//     </div>
//   );
// }

// function AccordionItem({ title, onSelected, selected }) {
//   const handleToggle = () => {
//     onSelected(title);
//   };

//   return (
//     <div>
//       <label>
//         <input type="radio" checked={selected} onChange={handleToggle} />
//         {title}
//       </label>
//     </div>
//   );
// }

// export default Accordion;

// import React, { useState } from "react";

// function Accordion() {
//   const [foodVisible, setFoodVisible] = useState(false);
//   const [locationVisible, setLocationVisible] = useState(false);
//   const [priceVisible, setPriceVisible] = useState(false);
//   const [selectedFood, setSelectedFood] = useState([]);
//   const [selectedLocation, setSelectedLocation] = useState("");
//   const [selectedPrice, setSelectedPrice] = useState("");

//   const toggleFood = () => {
//     setFoodVisible(!foodVisible);
//     setLocationVisible(false);
//     setPriceVisible(false);
//   };

//   const toggleLocation = () => {
//     setFoodVisible(false);
//     setLocationVisible(!locationVisible);
//     setPriceVisible(false);
//   };

//   const togglePrice = () => {
//     setFoodVisible(false);
//     setLocationVisible(false);
//     setPriceVisible(!priceVisible);
//   };

//   const handleFoodChange = (food) => {
//     if (selectedFood.includes(food)) {
//       setSelectedFood(selectedFood.filter((f) => f !== food));
//     } else {
//       setSelectedFood([...selectedFood, food]);
//     }
//   };

//   const handleLocationChange = (location) => {
//     setSelectedLocation(location);
//   };

//   const handlePriceChange = (price) => {
//     setSelectedPrice(price);
//   };

//   return (
//     <div>
//       <div onClick={toggleFood}>음식종류</div>
//       {foodVisible && (
//         <div>
//           <input
//             type="checkbox"
//             checked={selectedFood.includes("한식")}
//             onChange={() => handleFoodChange("한식")}
//           />
//           한식
//           <input
//             type="checkbox"
//             checked={selectedFood.includes("중식")}
//             onChange={() => handleFoodChange("중식")}
//           />
//           중식
//           <input
//             type="checkbox"
//             checked={selectedFood.includes("일식")}
//             onChange={() => handleFoodChange("일식")}
//           />
//           일식
//         </div>
//       )}
//       <div onClick={toggleLocation}>장소</div>
//       {locationVisible && (
//         <div>
//           <input
//             type="radio"
//             checked={selectedLocation === "250km"}
//             onChange={() => handleLocationChange("250km")}
//           />
//           250km
//           <input
//             type="radio"
//             checked={selectedLocation === "500km"}
//             onChange={() => handleLocationChange("500km")}
//           />
//           500km
//           <input
//             type="radio"
//             checked={selectedLocation === "750km"}
//             onChange={() => handleLocationChange("750km")}
//           />
//           750km
//         </div>
//       )}
//       <div onClick={togglePrice}>가격</div>
//       {priceVisible && (
//         <div>
//           <input
//             type="radio"
//             checked={selectedPrice === "~1만원"}
//             onChange={() => handlePriceChange("~1만원")}
//           />
//           ~1만원
//           <input
//             type="radio"
//             checked={selectedPrice === "1~2만원"}
//             onChange={() => handlePriceChange("1~2만원")}
//           />
//           1~2만원
//           <input
//             type="radio"
//             checked={selectedPrice === "2만원 ~"}
//             onChange={() => handlePriceChange("2만원 ~")}
//           />
//           2만원 ~
//         </div>
//       )}
//     </div>
//   );
// }

// export default Accordion;
