import React from "react";

import styles from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  let modalStyles = [styles.Modal];

  if (props.noPadding) modalStyles.push(styles.noPadding);
  return (
    <>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={modalStyles.join(" ")}
        style={{
          transform: props.show
            ? "translate(-50%, -50%)"
            : "translateY(-130vh)",
          opacity: props.show ? "1" : "0",
          borderRadius: "5px",
        }}
      >
        {props.children}
      </div>
    </>
  );
};

export default Modal;
