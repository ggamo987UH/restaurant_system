import styles from "./Button.module.css";

const button = (props) => {
  const {
    border,
    backgroundColor,
    color,
    children,
    height,
    onClick,
    radius,
    width,
  } = props;

  return (
    <button
      onClick={onClick}
      className={styles["button"]}
      style={{
        backgroundColor: backgroundColor,
        color: color,
        border,
        borderRadius: radius,
        height,
        width,
      }}
    >
      {children}
    </button>
  );
};

export default button;
