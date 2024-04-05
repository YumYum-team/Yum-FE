import React, {useState} from "react";
import styles from "./FoodList.module.css";
import FoodInfo from "./FoodInfo";

function FriendList({foodList, onFoodInfoClick}) {

    const [showShadow, setShowShadow] = useState(false);

    const scrollHandler = (event) => {
        const scrollTop = event.target.scrollTop;

        setShowShadow(scrollTop > 0);
    };

    return (
        <div className={styles["food-list"]} onScroll={scrollHandler}>
            {showShadow && <div className={styles["top-shadow"]}/>}

            {foodList.map(food => {
                return (
                    <FoodInfo
                        key={food.RSTR_ID}
                        food={food}
                        onClick={onFoodInfoClick}
                    />
                );
            })}
        </div>
    );
}

export default FriendList;