import { useNavigate } from "react-router-dom";
import CardSection from "./CardSection/CardSection";
import Button from "../UI/Button/Button";
import styles from "./FlightOverviewCard.module.css";

const FlightOverviewCard = (props) => {
  const {
    flightID,
    aircraft_model,
    gate,
    from,
    to,
    status,
    date,
    time,
    duration,
  } = props;
  const navigate = useNavigate();

  return (
    <div className={styles["card-container"]}>
      <CardSection
        title={"Aircraft"}
        response={aircraft_model}
        gridColumn={"1/3"}
        gridRow={1}
        type="top"
      />
      <CardSection
        title={"Date"}
        response={date}
        gridColumn={5}
        gridRow={1}
        type="top"
      />
      <CardSection
        title={"Time"}
        response={time}
        gridColumn={6}
        gridRow={1}
        type="top"
      />
      <CardSection
        title={"From"}
        response={from}
        gridColumn={1}
        gridRow={"2/3"}
        type="bottom"
      />
      <CardSection
        title={"Duration"}
        response={duration}
        gridColumn={2}
        gridRow={"2/3"}
        type="bottom"
      />
      <CardSection
        title={"To"}
        response={to}
        gridColumn={3}
        gridRow={"2/3"}
        type="bottom"
      />
      <CardSection
        title={"Status"}
        response={status}
        gridColumn={4}
        gridRow={"2/3"}
        type="bottom"
      />
      <CardSection
        title={"Gate"}
        response={gate}
        gridColumn={5}
        gridRow={"2/3"}
        type="bottom"
      />
      <div className={styles["button-container" + ""]}>
        <Button
          border="none"
          backgroundColor="#00468B"
          color="white"
          height="50px"
          onClick={() =>
            navigate(`/flight-dashboard?flightid=${flightID}`, {
              state: { flightID: flightID },
            })
          }
          radius="5px"
          width="60%"
          children="Manage"
        >
          Manage
        </Button>
      </div>
    </div>
  );
};

export default FlightOverviewCard;
