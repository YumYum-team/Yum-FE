import React from "react";
import styles from "./FoodInfo.module.css";

function FoodInfo({ food, onClick }) {
    const { RSTR_ID, RSTR_NM, RSTR_RDNMADR, RSTR_TELNO, image  } = food;
    return(
        <div className={styles["food-container"]} onClick={() => onClick(RSTR_ID)}>
            <div className={styles["food-info"]}>
                <p className={styles["restaurant-name"]}>{RSTR_NM}</p>
                <div className={styles["top-section"]}>
                    <p className={styles["phone-num"]}>{RSTR_TELNO}</p>
                    <p className={styles["phone-num"]}>{RSTR_RDNMADR}</p>
                </div>
                <div className={styles["figure-container"]}>
                    <span className={`${styles["status"]} ${styles["green"]}`}> 활성화 </span>
                    <span className={styles["time"]}>운영시간 및 휴무확인</span>
                </div>
            </div>
            <img className={styles["food-img"]} src={image} alt="Food" />
        </div>
    );
}

export default FoodInfo;
