// import React, { useState, useEffect } from "react";
//
// function RestaurantList({ restaurants }) {
//   const [restaurantData, setRestaurantData] = useState([]);
//
//   useEffect(() => {
//     const fetchData = async () => {
//       if (restaurants && restaurants.length > 0) {
//         const dataWithImages = await Promise.all(
//           restaurants.map(async (restaurant) => {
//             const imageResponse = await fetch(restaurant.imageAPI);
//             const imageData = await imageResponse.json();
//             return { ...restaurant, image: imageData };
//           })
//         );
//         setRestaurantData(dataWithImages);
//       }
//     };
//
//     fetchData();
//   }, [restaurants]);
//
//   return (
//     <div>
//       <ul>
//         {restaurantData.map((restaurant, index) => (
//           <li key={index}>
//             <h3>{restaurant.title}</h3>
//             <img src={restaurant.image} alt={restaurant.title} />
//             <p>전화번호: {restaurant.phone}</p>
//             <p>주소: {restaurant.address}</p>
//             <p>운영시간: {restaurant.businessHours}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
//
// export default RestaurantList;
