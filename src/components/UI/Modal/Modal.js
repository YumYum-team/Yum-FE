import React from "react";
import styles from "./Modal.module.css";
import Icon from "../Icon/Icon";

function Modal({ children, modalClass, bodyClass, title, onClose }) {
  return (
    <div className={styles["modal-container"]}>
      <div className={styles["modal-background"]}></div>
      <div className={`${styles["modal"]} ${modalClass}`}>
        <div className={styles["modal-header"]}>
          <span className={styles["title"]}>{title}</span>
          <button className={styles["close-button"]} onClick={onClose}>
            <Icon type={"cancelStrokeWhite"} className={styles["close-icon"]} />
          </button>
        </div>
        <div className={`${bodyClass}`}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
