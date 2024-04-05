// import React, { useEffect, useRef, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import FoodListPanel from "./FoodListPanel/FoodListPanel";
// import Accordion from "./Accordion/Accordion";
// import NaverMap from "../../components/Map";
// import styles from "./MainPage.module.css";

// function MainPage() {
//   const navigate = useNavigate();

//   /* store */
//   const [foodList, setFoodList] = useState([]);
//   const [isInitial, setIsInitial] = useState(false);
//   const [fetchState, setFetchState] = useState([]);
//   const [currentPosition, setCurrentPosition] = useState();
//   const [poiList, setPoiList] = useState([]);
//   const [isOpenDetail, setIsOpenDetail] = useState(false);
//   const [selectedFoodId, setSelectedFoodId] = useState(false);
//   const [show, setShow] = useState(false);
//   const [selectedFoods, setSelectedFoods] = useState([]);
//   const [selectedDistance, setSelectedDistance] = useState(null);
//   const [selectedPriceRange, setSelectedPriceRange] = useState(null);
//   const [isFoodAccordionOpen, setIsFoodAccordionOpen] = useState(false);
//   const [isDistanceAccordionOpen, setIsDistanceAccordionOpen] = useState(false);
//   const [isPriceAccordionOpen, setIsPriceAccordionOpen] = useState(false);
//   const [searchResults, setSearchResults] = useState(null);

//   //   const history = useHistory();

//   const onFoodInfoClick = (foodId) => {
//     setSelectedFoodId(foodId);
//     setIsOpenDetail(true);
//   };

//   const requestFoodList = async (searchInput) => {
//     const searchParam = new URLSearchParams({ searchInput });

//     const response = await fetch(
//       `http://localhost:8080/api/restaurants?${searchParam}`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${fetchState.accessToken}`,
//         },
//       }
//     );
//     return await response.json();
//   };

//   const initFoodList = (searchInput) => {
//     requestFoodList(searchInput).then((data) => {
//       const FoodList = data["food"].map((food) => {
//         return {
//           RSTR_ID: food.RSTR_ID,
//           RSTR_NM: food.RSTR_NM,
//           RSTR_RDNMADR: food.RSTR_RDNMADR,
//           RSTR_TELNO: food.RSTR_TELNO,
//           image: food.image,
//         };
//       });
//       setFoodList(foodList || []);
//       setPoiList(
//         foodList.map((food) => {
//           return {
//             longitude: food.longitude,
//             latitude: food.latitude,
//             color: "green",
//           };
//         })
//       );
//     });
//   };

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

//   useEffect(() => {
//     if (isInitial && fetchState.accessToken && !fetchState.isFetching) {
//       setIsInitial(false);
//       initFoodList("");
//     }
//   }, [fetchState]);

//   return (
//     <div>
//       <div className={styles["content"]}>
//         <Accordian onSearchClick={() => setShow(true)} />
//         {show && (
//           <FoodListPanel
//             foodList={foodList}
//             initFoodList={initFoodList}
//             onFoodInfoClick={onFoodInfoClick}
//           />
//         )}

//         <div>
//           <button onClick={toggleFoodAccordion}>
//             {isFoodAccordionOpen ? "음식 종류 숨기기" : "음식 종류 선택하기"}
//           </button>
//           {isFoodAccordionOpen && (
//             <div>
//               <AccordionItem
//                 title="한식"
//                 onSelected={handleFoodSelection}
//                 selected={selectedFoods.includes("한식")}
//               />
//               <AccordionItem
//                 title="중식"
//                 onSelected={handleFoodSelection}
//                 selected={selectedFoods.includes("중식")}
//               />
//               <AccordionItem
//                 title="양식"
//                 onSelected={handleFoodSelection}
//                 selected={selectedFoods.includes("양식")}
//               />
//             </div>
//           )}
//         </div>
//         <div>
//           <button onClick={toggleDistanceAccordion}>
//             {isDistanceAccordionOpen ? "거리 숨기기" : "거리 선택하기"}
//           </button>
//           {isDistanceAccordionOpen && (
//             <div>
//               <AccordionItem
//                 title="100km"
//                 onSelected={handleDistanceSelection}
//                 selected={selectedDistance === "100km"}
//               />
//               <AccordionItem
//                 title="200km"
//                 onSelected={handleDistanceSelection}
//                 selected={selectedDistance === "200km"}
//               />
//               <AccordionItem
//                 title="300km"
//                 onSelected={handleDistanceSelection}
//                 selected={selectedDistance === "300km"}
//               />
//             </div>
//           )}
//         </div>
//         <div>
//           <button onClick={togglePriceAccordion}>
//             {isPriceAccordionOpen ? "가격 숨기기" : "가격 선택하기"}
//           </button>
//           {isPriceAccordionOpen && (
//             <div>
//               <AccordionItem
//                 title="~1만원"
//                 onSelected={handlePriceRangeSelection}
//                 selected={selectedPriceRange === "~1만원"}
//               />
//               <AccordionItem
//                 title="1만원~2만원"
//                 onSelected={handlePriceRangeSelection}
//                 selected={selectedPriceRange === "1만원~2만원"}
//               />
//               <AccordionItem
//                 title="3만원 이상"
//                 onSelected={handlePriceRangeSelection}
//                 selected={selectedPriceRange === "3만원 이상"}
//               />
//             </div>
//           )}
//         </div>
//         <div>
//           <button onClick={handleSearch}>검색</button>
//         </div>
//         <FoodListPanel
//           foodList={foodList}
//           initFoodList={initFoodList}
//           onFoodInfoClick={onFoodInfoClick}
//         />

//         {/*<FoodDetailPanel*/}
//         {/*    isOpen={isOpenDetail}*/}
//         {/*    onClose={detailOnCloseHandler}*/}
//         {/*    selectedFoodId={selectedFoodId}/>*/}

//         <div className={styles["map-container"]}>
//           <NaverMap position={currentPosition} poiList={poiList} />
//         </div>
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
// export default MainPage;

import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FoodListPanel from "./FoodListPanel/FoodListPanel";
import NaverMap from "../../components/Map";
import styles from "./MainPage.module.css";
import Accordian from "./Accordion/Accordion";

function MainPage() {
  const navigate = useNavigate();

  /* store */
  const [foodList, setFoodList] = useState([]);
  // const [isInitial, setIsInitial] = useState(false);
  const [currentPosition, setCurrentPosition] = useState();
  const [poiList, setPoiList] = useState([]);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState(false);
  const [show, setShow] = useState(false);
  const [fetchState, setFetchState] = useState([]);

  const onFoodInfoClick = (foodId) => {
    setSelectedFoodId(foodId);
    setIsOpenDetail(true);
  };

  const requestFoodList = async (searchInput) => {
    const searchParam = new URLSearchParams({ searchInput });

    const response = await fetch(
      `http://138.2.122.249:8080/api/restaurants?${searchParam}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${fetchState.accessToken}`,
        },
      }
    );
    return await response.json();
  };

  const initFoodList = (searchInput) => {
    requestFoodList(searchInput).then((data) => {
      const FoodList = data["food"].map((food) => {
        return {
          RSTR_ID: food.RSTR_ID,
          RSTR_NM: food.RSTR_NM,
          RSTR_RDNMADR: food.RSTR_RDNMADR,
          RSTR_TELNO: food.RSTR_TELNO,
          image: food.image,
        };
      });
      setFoodList(foodList || []);
      setPoiList(
        foodList.map((food) => {
          return {
            longitude: food.longitude,
            latitude: food.latitude,
            color: "green",
          };
        })
      );
    });
  };

  return (
    <div className={styles["content"]}>
      <Accordian onSearchClick={() => setShow(true)} />
      {show && (
        <FoodListPanel
          foodList={foodList}
          initFoodList={initFoodList}
          onFoodInfoClick={onFoodInfoClick}
        />
      )}

      <div className={styles["map-container"]}>
        <NaverMap position={currentPosition} poiList={poiList} />
      </div>
    </div>
  );
}

export default MainPage;
