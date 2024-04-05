// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { NaverMap, useNavermaps, Marker } from "react-naver-maps";
// // import styles from "../Mainpage/MapPage.css";
// // import RestaurantList from "./RestaurantList";
// // import { Link } from "react-router-dom";
//
// // function Accordion() {
// //   const [foodOptionsOpen, setFoodOptionsOpen] = useState(false);
// //   const [locationOptionsOpen, setLocationOptionsOpen] = useState(false);
// //   const [priceOptionsOpen, setPriceOptionsOpen] = useState(false);
// //   const [selectedFoodOptions, setSelectedFoodOptions] = useState([]);
// //   const [selectedLocationOption, setSelectedLocationOption] = useState("");
// //   const [selectedPriceOption, setSelectedPriceOption] = useState("");
// //   const [foodSearchQuery, setFoodSearchQuery] = useState("");
// //   const [locationSearchQuery, setLocationSearchQuery] = useState("");
// //   const [currentPosition, setCurrentPosition] = useState(null);
// //   const [restaurants, setRestaurants] = useState([]);
// //   const navermaps = useNavermaps({
// //     ncpClientId: "ewq80h87fv",
// //   });
//
// //   const toggleFoodOptions = () => {
// //     setFoodOptionsOpen(!foodOptionsOpen);
// //   };
//
// //   const toggleLocationOptions = () => {
// //     setLocationOptionsOpen(!locationOptionsOpen);
// //   };
//
// //   const togglePriceOptions = () => {
// //     setPriceOptionsOpen(!priceOptionsOpen);
// //   };
//
// //   const handleFoodOptionChange = (option) => {
// //     const isSelected = selectedFoodOptions.includes(option);
// //     if (isSelected) {
// //       setSelectedFoodOptions(
// //         selectedFoodOptions.filter((item) => item !== option)
// //       );
// //     } else {
// //       setSelectedFoodOptions([...selectedFoodOptions, option]);
// //     }
// //   };
//
// //   const handleLocationOptionChange = (option) => {
// //     setSelectedLocationOption(option);
// //   };
//
// //   const handlePriceOptionChange = (option) => {
// //     setSelectedPriceOption(option);
// //   };
//
// //   const handleFoodSearchChange = (event) => {
// //     setFoodSearchQuery(event.target.value);
// //   };
//
// //   const handleLocationSearchChange = (event) => {
// //     setLocationSearchQuery(event.target.value);
// //   };
//
// //   const handleSearch = async () => {
// //     try {
// //       const queryOptions = [];
// //       if (selectedFoodOptions.length > 0) {
// //         queryOptions.push(`category=${selectedFoodOptions.join(",")}`);
// //       }
// //       if (selectedLocationOption) {
// //         queryOptions.push(`radius=${selectedLocationOption}`);
// //       }
// //       if (selectedPriceOption) {
// //         queryOptions.push(`price=${selectedPriceOption}`);
// //       }
// //       const queryString = queryOptions.join("&");
//
// //       const response = await axios.get(
// //         `https://naveropenapi.apigw.ntruss.com/map-place/v1/search?query=${foodSearchQuery}&${queryString}`,
// //         {
// //           headers: {
// //             "X-NCP-APIGW-API-KEY-ID": "ewq80h87fv",
// //             "X-NCP-APIGW-API-KEY": "NeSWWtzTc4IRWrKmSxeZcYbEotM6MbMo708WPZtY",
// //           },
// //         }
// //       );
//
// //       console.log("검색 결과:", response.data);
//
// //       setRestaurants(response.data.places);
//
// //       // 여기에 검색 결과를 지도에 표시하는 코드를 추가할 수 있음
// //       // 예를 들어, NaverMap 컴포넌트의 marker나 overlay를 이용하여 표시할 수 있음
// //     } catch (error) {
// //       console.error("네이버 지도 API 오류:", error);
// //     }
// //   };
//
// //   useEffect(() => {
// //     const fetchLocation = async () => {
// //       try {
// //         const position = await getCurrentPosition();
// //         setCurrentPosition(position);
// //       } catch (error) {
// //         console.error("Error fetching location:", error);
// //       }
// //     };
//
// //     fetchLocation();
// //   }, []);
//
// //   const getCurrentPosition = () => {
// //     return new Promise((resolve, reject) => {
// //       navigator.geolocation.getCurrentPosition(
// //         (position) => {
// //           resolve({
// //             lat: position.coords.latitude,
// //             lng: position.coords.longitude,
// //           });
// //         },
// //         (error) => {
// //           reject(error);
// //         }
// //       );
// //     });
// //   };
//
// //   useEffect(() => {
// //     const loadNaverMap = async () => {
// //       try {
// //         const response = await axios.get(
// //           `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${currentPosition.lng},${currentPosition.lat}&output=json`,
// //           {
// //             headers: {
// //               "X-NCP-APIGW-API-KEY-ID": "ewq80h87fv",
// //               "X-NCP-APIGW-API-KEY": "NeSWWtzTc4IRWrKmSxeZcYbEotM6MbMo708WPZtY",
// //             },
// //           }
// //         );
// //         console.log(response.data);
// //       } catch (error) {
// //         console.error("Error fetching Naver Map:", error);
// //       }
// //     };
//
// //     if (currentPosition && navermaps.loaded) {
// //       loadNaverMap();
// //     }
// //   }, [currentPosition, navermaps.loaded]);
//
// //   return (
// //     <div>
// //       <div className="left">
// //         <div className="search">
// //           <div className="searchbox">
// //             <input
// //               type="text"
// //               placeholder="음식점을 검색해보세요"
// //               value={foodSearchQuery}
// //               onChange={handleFoodSearchChange}
// //             />
// //             <button onClick={handleSearch}>검색</button>
// //           </div>
// //         </div>
// //         <div>
// //           <div className="starred">저장한 장소</div>
// //         </div>
// //         <div className="food" onClick={toggleFoodOptions}>
// //           음식 종류
// //         </div>
// //         {foodOptionsOpen && (
// //           <div className="food-option">
// //             <div>
// //               <label>
// //                 <input
// //                   type="checkbox"
// //                   value="일식"
// //                   onChange={() => handleFoodOptionChange("일식")}
// //                 />
// //                 일식
// //               </label>
// //             </div>
// //             <div>
// //               <label>
// //                 <input
// //                   type="checkbox"
// //                   value="중식"
// //                   onChange={() => handleFoodOptionChange("중식")}
// //                 />
// //                 중식
// //               </label>
// //             </div>
// //             <div>
// //               <label>
// //                 <input
// //                   type="checkbox"
// //                   value="양식"
// //                   onChange={() => handleFoodOptionChange("양식")}
// //                 />
// //                 양식
// //               </label>
// //             </div>
// //           </div>
// //         )}
// //         <div className="place" onClick={toggleLocationOptions}>
// //           장소
// //         </div>
// //         {locationOptionsOpen && (
// //           <div className="place-option">
// //             {["250km", "500km", "1000km"].map((option, index) => (
// //               <div key={index}>
// //                 <label>
// //                   <input
// //                     type="radio"
// //                     value={option}
// //                     checked={selectedLocationOption === option}
// //                     onChange={() => handleLocationOptionChange(option)}
// //                   />
// //                   {option}
// //                 </label>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //         <div className="price" onClick={togglePriceOptions}>
// //           가격
// //         </div>
// //         {priceOptionsOpen && (
// //           <div className="price-option">
// //             {["~2만원", "2~4만원", "4~6만원"].map((option, index) => (
// //               <div key={index}>
// //                 <label>
// //                   <input
// //                     type="radio"
// //                     value={option}
// //                     checked={selectedPriceOption === option}
// //                     onChange={() => handlePriceOptionChange(option)}
// //                   />
// //                   {option}
// //                 </label>
// //               </div>
// //             ))}
// //           </div>
// //         )}
//
// //         {/* 검색 버튼 */}
// //         <div className="button2">
// //           <Link to="/RestaurantList/restaurant-list">
// //             <button>검색</button>
// //           </Link>
// //         </div>
// //       </div>
//
// //       {/* 오른쪽 영역 */}
// //       <div style={{ display: "flex", flexDirection: "column" }}>
// //         <div style={{ flex: 1 }}>
// //           {currentPosition && navermaps.loaded && (
// //             <NaverMap
// //               id="map"
// //               style={{ width: "100%", height: "100%" }}
// //               defaultCenter={{
// //                 lat: currentPosition.lat,
// //                 lng: currentPosition.lng,
// //               }}
// //               defaultZoom={13}
// //             >
// //               {restaurants.map((restaurant, index) => (
// //                 <Marker
// //                   key={index}
// //                   position={{ lat: restaurant.y, lng: restaurant.x }}
// //                 />
// //               ))}
// //             </NaverMap>
// //           )}
// //         </div>
// //         <div style={{ flex: 1 }}>
// //           <RestaurantList restaurants={restaurants} />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
//
// // export default Accordion;
//
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { NaverMap, useNavermaps, Marker } from "react-naver-maps";
// import styles from "../Mainpage/MapPage.css";
// import RestaurantList from "./RestaurantList";
// import { Link } from "react-router-dom";
//
// function Accordion() {
//   const [foodOptionsOpen, setFoodOptionsOpen] = useState(false);
//   const [locationOptionsOpen, setLocationOptionsOpen] = useState(false);
//   const [priceOptionsOpen, setPriceOptionsOpen] = useState(false);
//   const [selectedFoodOptions, setSelectedFoodOptions] = useState([]);
//   const [selectedLocationOption, setSelectedLocationOption] = useState("");
//   const [selectedPriceOption, setSelectedPriceOption] = useState("");
//   const [foodSearchQuery, setFoodSearchQuery] = useState("");
//   const [locationSearchQuery, setLocationSearchQuery] = useState("");
//   const [currentPosition, setCurrentPosition] = useState(null);
//   const [restaurants, setRestaurants] = useState([]);
//   const navermaps = useNavermaps({
//     ncpClientId: "ewq80h87fv",
//   });
//
//   const toggleFoodOptions = () => {
//     setFoodOptionsOpen(!foodOptionsOpen);
//   };
//
//   const toggleLocationOptions = () => {
//     setLocationOptionsOpen(!locationOptionsOpen);
//   };
//
//   const togglePriceOptions = () => {
//     setPriceOptionsOpen(!priceOptionsOpen);
//   };
//
//   const handleFoodOptionChange = (option) => {
//     const isSelected = selectedFoodOptions.includes(option);
//     if (isSelected) {
//       setSelectedFoodOptions(
//         selectedFoodOptions.filter((item) => item !== option)
//       );
//     } else {
//       setSelectedFoodOptions([...selectedFoodOptions, option]);
//     }
//   };
//
//   const handleLocationOptionChange = (option) => {
//     setSelectedLocationOption(option);
//   };
//
//   const handlePriceOptionChange = (option) => {
//     setSelectedPriceOption(option);
//   };
//
//   const handleFoodSearchChange = (event) => {
//     setFoodSearchQuery(event.target.value);
//   };
//
//   const handleLocationSearchChange = (event) => {
//     setLocationSearchQuery(event.target.value);
//   };
//
//   const handleSearch = async () => {
//     try {
//       const queryOptions = [];
//       if (selectedFoodOptions.length > 0) {
//         queryOptions.push(`category=${selectedFoodOptions.join(",")}`);
//       }
//       if (selectedLocationOption) {
//         queryOptions.push(`radius=${selectedLocationOption}`);
//       }
//       if (selectedPriceOption) {
//         queryOptions.push(`price=${selectedPriceOption}`);
//       }
//       const queryString = queryOptions.join("&");
//
//       const response = await axios.get(
//         `https://naveropenapi.apigw.ntruss.com/map-place/v1/search?query=${foodSearchQuery}&${queryString}`,
//         {
//           headers: {
//             "X-NCP-APIGW-API-KEY-ID": "ewq80h87fv",
//             "X-NCP-APIGW-API-KEY": "NeSWWtzTc4IRWrKmSxeZcYbEotM6MbMo708WPZtY",
//           },
//         }
//       );
//
//       console.log("검색 결과:", response.data);
//
//       setRestaurants(response.data.places);
//
//       // 여기에 검색 결과를 지도에 표시하는 코드를 추가할 수 있음
//       // 예를 들어, NaverMap 컴포넌트의 marker나 overlay를 이용하여 표시할 수 있음
//     } catch (error) {
//       console.error("네이버 지도 API 오류:", error);
//     }
//   };
//
//   useEffect(() => {
//     const fetchLocation = async () => {
//       try {
//         const position = await getCurrentPosition();
//         setCurrentPosition(position);
//       } catch (error) {
//         console.error("Error fetching location:", error);
//       }
//     };
//
//     fetchLocation();
//   }, []);
//
//   const getCurrentPosition = () => {
//     return new Promise((resolve, reject) => {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           resolve({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//         },
//         (error) => {
//           reject(error);
//         }
//       );
//     });
//   };
//
//   useEffect(() => {
//     const loadNaverMap = async () => {
//       try {
//         const response = await axios.get(
//           `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${currentPosition.lng},${currentPosition.lat}&output=json`,
//           {
//             headers: {
//               "X-NCP-APIGW-API-KEY-ID": "ewq80h87fv",
//               "X-NCP-APIGW-API-KEY": "NeSWWtzTc4IRWrKmSxeZcYbEotM6MbMo708WPZtY",
//             },
//           }
//         );
//         console.log(response.data);
//       } catch (error) {
//         console.error("Error fetching Naver Map:", error);
//       }
//     };
//
//     if (currentPosition && navermaps.loaded) {
//       loadNaverMap();
//     }
//   }, [currentPosition, navermaps.loaded]);
//
//   return (
//     <div>
//       <div className="left">
//         <div className="search">
//           <div className="searchbox">
//             <input
//               type="text"
//               placeholder="음식점을 검색해보세요"
//               value={foodSearchQuery}
//               onChange={handleFoodSearchChange}
//             />
//             <button onClick={handleSearch}>검색</button>
//           </div>
//         </div>
//         <div>
//           <div className="starred">저장한 장소</div>
//         </div>
//         <div className="food" onClick={toggleFoodOptions}>
//           음식 종류
//         </div>
//         {foodOptionsOpen && (
//           <div className="food-option">
//             <div>
//               <label>
//                 <input
//                   type="checkbox"
//                   value="일식"
//                   onChange={() => handleFoodOptionChange("일식")}
//                 />
//                 일식
//               </label>
//             </div>
//             <div>
//               <label>
//                 <input
//                   type="checkbox"
//                   value="중식"
//                   onChange={() => handleFoodOptionChange("중식")}
//                 />
//                 중식
//               </label>
//             </div>
//             <div>
//               <label>
//                 <input
//                   type="checkbox"
//                   value="양식"
//                   onChange={() => handleFoodOptionChange("양식")}
//                 />
//                 양식
//               </label>
//             </div>
//           </div>
//         )}
//         <div className="place" onClick={toggleLocationOptions}>
//           장소
//         </div>
//         {locationOptionsOpen && (
//           <div className="place-option">
//             {["250km", "500km", "1000km"].map((option, index) => (
//               <div key={index}>
//                 <label>
//                   <input
//                     type="radio"
//                     value={option}
//                     checked={selectedLocationOption === option}
//                     onChange={() => handleLocationOptionChange(option)}
//                   />
//                   {option}
//                 </label>
//               </div>
//             ))}
//           </div>
//         )}
//         <div className="price" onClick={togglePriceOptions}>
//           가격
//         </div>
//         {priceOptionsOpen && (
//           <div className="price-option">
//             {["2만원", "24만원", "4~6만원"].map((option, index) => (
//               <div key={index}>
//                 <label>
//                   <input
//                     type="radio"
//                     value={option}
//                     checked={selectedPriceOption === option}
//                     onChange={() => handlePriceOptionChange(option)}
//                   />
//                   {option}
//                 </label>
//               </div>
//             ))}
//           </div>
//         )}
//         {/* 검색 버튼 */}
//         <div className="button2">
//           <Link to="/RestaurantList/restaurant-list">
//             <button>검색</button>
//           </Link>
//         </div>
//       </div>
//
//       {/* 오른쪽 영역 */}
//       <div style={{ display: "flex", flexDirection: "column" }}>
//         <div style={{ flex: 1 }}>
//           {currentPosition && navermaps.loaded && (
//             <NaverMap
//               id="map"
//               style={{ width: "100%", height: "100%" }}
//               defaultCenter={{
//                 lat: currentPosition.lat,
//                 lng: currentPosition.lng,
//               }}
//               defaultZoom={13}
//             >
//               {restaurants.map((restaurant, index) => (
//                 <Marker
//                   key={index}
//                   position={{ lat: restaurant.y, lng: restaurant.x }}
//                 />
//               ))}
//             </NaverMap>
//           )}
//         </div>
//         <div style={{ flex: 1 }}>
//           <RestaurantList restaurants={restaurants} />
//         </div>
//       </div>
//     </div>
//   );
// }
//
// export default Accordion;
