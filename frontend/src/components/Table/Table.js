import Header from "./Header/Header";
import Rows from "./Rows/Rows";
import styles from "./Table.module.css";

const Table = (props) => {
  const { headers, data } = props;

  return (
    <div className={styles.table}>
      <Header headers={headers} />
      <Rows data={data} />
    </div>
  );
};

export default Table;
