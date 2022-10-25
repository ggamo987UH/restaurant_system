import Cell from "../Cell/Cell";
import styles from "./Rows.module.css";

const Rows = (props) => {
  const { data } = props;

  return (
    <>
      {data.map((dataObj, i) => (
        <div key={i} className={styles["table-row"]}>
          <Cell dataObj={dataObj} />
        </div>
      ))}
      <div className={styles["table-last-row"]}></div>
    </>
  );
};

export default Rows;
