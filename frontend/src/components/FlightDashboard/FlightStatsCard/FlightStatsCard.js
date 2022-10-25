import styles from "./FlightStatsCard.module.css";
import Button from "../../UI/Button/Button";

const FlightStatsCard = (props) => {
  const { title, flightStats, clicked } = props;

  return (
    <>
      <div className={styles["title-container"]}>
        {title}
        <Button
          border="none"
          backgroundColor="#00468B"
          color="white"
          height="36px"
          onClick={() => clicked()}
          radius="5px"
          width="12%"
          children="Manage"
        >
          Edit
          <br />
          Flight
        </Button>
      </div>
      <div className={styles["flight-stats-container"]}>
        <div>
          <span className={styles["bold"]}>Aircraft Model: </span>
          {flightStats.aircraft_model}
        </div>
        <div>
          <span className={styles["bold"]}>Available Seats: </span>
          {flightStats.available_seats}
        </div>
        <div>
          <span className={styles["bold"]}>Flight Date: </span>
          {flightStats.date}
        </div>

        <div>
          <span className={styles["bold"]}>Flight Time: </span>
          {flightStats.time}
        </div>
        <div>
          <span className={styles["bold"]}>Flight Gate: </span>
          {flightStats.gate}
        </div>
        <div>
          <span className={styles["bold"]}>Flight Status: </span>
          {flightStats.status}
        </div>
        <div>
          <span className={styles["bold"]}>From: </span>
          {flightStats.arrival_airport_name} ({flightStats.arrival_airport_city}
          )
        </div>
        <div>
          <span className={styles["bold"]}>To: </span>
          {flightStats.departure_airport_name} (
          {flightStats.departure_airport_city})
        </div>
        <div>
          <span className={styles["bold"]}>Flight Ready: </span>
          {flightStats.is_flight_ready}
        </div>
        <div>
          <span className={styles["bold"]}>Flight Refilled: </span>
          {flightStats.has_refilled}
        </div>
        <div>
          <span className={styles["bold"]}>Flight Cleaned: </span>
          {flightStats.has_cleaned}
        </div>
      </div>
    </>
  );
};

export default FlightStatsCard;
