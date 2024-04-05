import React, { useEffect, useState } from "react";
import { ChevronLeft, StarFill, Star } from "react-bootstrap-icons";
import "./FavoritesPage.css";
import { useNavigate } from "react-router-dom";

const FavoritesPage = () => {
  const [stores, setStores] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavoriteStores = async () => {
      try {
        const response = await fetch(
          "http://138.2.122.249:8080/v1/api/savePlaceList",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch favorite stores");
        }
        const data = await response.json();
        setStores(data);
      } catch (error) {
        console.error("Error fetching favorite stores:", error);
      }
    };

    fetchFavoriteStores();
  }, []);

  const backButtonHandler = () => {
    navigate("/mypage");
  };

  const handleFavoriteToggle = async (storeId) => {
    try {
      const response = await fetch(
        "http://138.2.122.249:8080/v1/api/delSavePlace",
        {
          method: "POST",
          // 필요한 헤더 추가
          body: JSON.stringify({ storeId: storeId }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to toggle favorite status");
      }
      setFavorites((prevFavorites) =>
        prevFavorites.includes(storeId)
          ? prevFavorites.filter((favId) => favId !== storeId)
          : [...prevFavorites, storeId]
      );
    } catch (error) {
      console.error("Error toggling favorite status:", error);
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
            <img className="storeImage" src={store.image} alt="store Image" />
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
