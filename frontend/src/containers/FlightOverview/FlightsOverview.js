import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import FlightOverviewCard from "../../components/FlightOverviewCard/FlightOverviewCard";
import styles from "./FlightOverview.module.css";
import FlightForm from "../../components/Forms/FlightForm/FlightForm";
import Modal from "../../components/UI/Modal/Modal";
import Button from "../../components/UI/Button/Button";

const FlightsOverview = () => {
  const [flights, setFlights] = useState([]);
  const [show, setShow] = useState(false);
  const [isFlightCreated, setIsFlightCreated] = useState(false);
  const [toggleRefresh, setToggleRefresh] = useState(false);

  // EXAMPLE HOW TO GET REQUEST API CALL
  const getFlights = async () => {
    const res = await axios.get("http://127.0.0.1:5000/api/v1/flights/");
    setFlights(res.data.data.flights);
  };

  const toggleModal = () => setShow(!show);

  const toggleCreateFlightForm = () => {
    // setToggleModal(true);
    setShow(true);
  };

  const toggleRefreshPage = () => {
    setToggleRefresh(!toggleRefresh);
  };

  useEffect(() => {
    getFlights();
  }, [toggleRefresh]);

  return (
    <div className={styles["flight-overview-cards-container"]}>
      <Modal show={show} modalClosed={toggleModal} noPadding>
        <FlightForm
          toggleModal={toggleModal}
          toggleRefreshPage={toggleRefreshPage}
        />
      </Modal>
      <Button
        border="none"
        backgroundColor="#00468B"
        color="white"
        height="45px"
        onClick={toggleCreateFlightForm}
        radius="5px"
        width="8%"
        children="Manage"
      >
        Create Flight
      </Button>
      {flights.map((flight) => {
        const {
          flight_id,
          aircraft_model,
          gate,
          arrival_airport_city,
          departure_airport_city,
          status,
          date,
          time,
          duration,
        } = flight;
        return (
          <FlightOverviewCard
            flightID={flight_id}
            key={flight_id}
            aircraft_model={aircraft_model}
            gate={gate}
            from={arrival_airport_city}
            to={departure_airport_city}
            status={status}
            date={date}
            time={time}
            duration={duration}
          />
        );
      })}
    </div>
  );
};

export default FlightsOverview;
