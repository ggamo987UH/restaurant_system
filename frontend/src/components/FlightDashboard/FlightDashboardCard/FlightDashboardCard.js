import Table from "../../Table/Table";
import styles from "./FlightDashboardCard.module.css";

const FlightDashboardCard = (props) => {
  const { headers, data, title } = props;

  return (
    <div className={styles["card-container"]}>
      <div className={styles["title-container"]}>{title}</div>
      <Table headers={headers} data={data} />
    </div>
  );
};

export default FlightDashboardCard;
