import React, { useEffect, useState } from "react";
import { ChevronLeft, StarFill, Star } from "react-bootstrap-icons";
import "./FavoritesPage.css";
import { useNavigate } from "react-router-dom";
import { webLogo } from "../../assets/images";

const stores = [
  {
    id: 1,
    name: "봉순이네 음식점",
    address: "여의도",
    phoneNumber: "010-1111-1111",
  },
  {
    id: 2,
    name: "예순이네 음식점",
    address: "여의나루역",
    phoneNumber: "010-2222-2222",
  },
  {
    id: 3,
    name: "수진이네 음식점",
    address: "여의나루역",
    phoneNumber: "010-3333-3333",
  },
  {
    id: 4,
    name: "동호네 음식점",
    address: "여의나루역",
    phoneNumber: "010-4444-4444",
  },
  {
    id: 5,
    name: "하름이네 음식점",
    address: "여의나루역",
    phoneNumber: "010-5555-5555",
  },
  {
    id: 6,
    name: "지섭이네 음식점",
    address: "여의나루역",
    phoneNumber: "010-6666-6666",
  },
  {
    id: 7,
    name: "선주네 음식점",
    address: "여의나루역",
    phoneNumber: "010-7777-7777",
  },
  {
    id: 8,
    name: "슬기네 음식점",
    address: "여의나루역",
    phoneNumber: "010-8888-8888",
  },
  {
    id: 9,
    name: "훈희네 음식점",
    address: "여의나루역",
    phoneNumber: "010-9999-9999",
  },
  {
    id: 10,
    name: "예린이네 음식점",
    address: "여의나루역",
    phoneNumber: "010-0000-0000",
  },
];

const FavoritesPage = () => {
  // const [stores, setStores] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {

  //   const fetchStores = async () => {
  //     try {
  //       const response = await fetch("주소 백엔드에서 가져오기");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch stores");
  //       }
  //       const data = await response.json();
  //       setStores(data);
  //     } catch (error) {
  //       console.error("Error fetching stores:", error);
  //     }
  //   };

  //   fetchStores();
  // }, []);

  const backButtonHandler = () => {
    navigate("/mypage");
  };

  const handleFavoriteToggle = (storeId) => {
    if (favorites.includes(storeId)) {
      setFavorites(favorites.filter((favId) => favId !== storeId));
    } else {
      setFavorites([...favorites, storeId]);
    }
  };

  return (
    <div className="favorites">
      <button className="pageBack" onClick={backButtonHandler}>
        <ChevronLeft /> 저장한 장소
      </button>
      <div className="favorites-page">
        {stores.map((store) => (
          <div className="store-box" key={store.id}>
            <div className="store">
              <p>{store.name}</p>
              <p>{store.address}</p>
              <p>{store.phoneNumber}</p>
            </div>
            <img className="storeImage" src={webLogo} alt="webLogo" />
            {/* <img className="storeImage" src={store.imag} alt="store Image" /> */}
            <span
              className="favorite"
              onClick={() => handleFavoriteToggle(store.id)}
            >
              {favorites.includes(store.id) ? (
                <StarFill className="StarFill" />
              ) : (
                <Star className="Star" />
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
