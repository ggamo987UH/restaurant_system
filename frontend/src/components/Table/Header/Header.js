import styles from "./Header.module.css";

const Header = (props) => {
  const { headers } = props;

  return (
    <div className={styles["table-row"]}>
      {headers.map((header) => (
        <div key={header} className={styles["table-cell"]}>
          {header}
        </div>
      ))}
    </div>
  );
};

export default Header;
