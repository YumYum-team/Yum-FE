import React, { useState } from "react";
import styles from "./FoodListPanel.module.css";
import FoodList from "./FoodList";

function FoodListPanel({ foodList, initFoodList, onFoodInfoClick }) {
    const [searchInput, setSearchInput] = useState("");

    return (
        <div className={styles["left-panel"]}>
            <div className={styles["search"]}>
                <i className="bi bi-search"></i>
                <input
                    type="text"
                    placeholder="음식점 찾기"
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                    onKeyUp={(event) => {
                        if (event.key === "Enter") {
                            initFoodList(searchInput);
                        }
                    }}
                />
            </div>

            <FoodList foodList={foodList} onFoodInfoClick={onFoodInfoClick} />
        </div>
    );
}

export default FoodListPanel;
