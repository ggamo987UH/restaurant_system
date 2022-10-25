import styles from "./CardSection.module.css";

const CardSection = (props) => {
  const { title, response, gridColumn, gridRow, type } = props;
  const gridColumnRow = { "gridColumn": gridColumn, "gridRow": gridRow };

  return (
    <div className={styles["grid-container"]} style={gridColumnRow}>
      <div className={styles["text"]}>
        <span className={styles["title"]}>{title}</span>
        <span
          className={
            type === "bottom" ? styles["bottom-response"] : styles["response"]
          }
        >
          {response}
        </span>
      </div>
    </div>
  );
};

export default CardSection;
