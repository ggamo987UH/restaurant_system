import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import styles from "./FlightDashboard.module.css";
import FlightDashboardCard from "../../components/FlightDashboard/FlightDashboardCard/FlightDashboardCard";
import FlightStatsCard from "../../components/FlightDashboard/FlightStatsCard/FlightStatsCard";
import EditFlightForm from "../../components/Forms/EditFlightForm/EditFlightForm";
import Modal from "../../components/UI/Modal/Modal";
import Button from "../../components/UI/Button/Button";
import EditPassengerExtra from "../../components/Forms/EditPassengerExtra/EditPassengerExtra";

const FlightDashboard = () => {
  const { state } = useLocation();
  const { flightID } = state;
  const [selectedPassengerExtra, setSelectedPassengerExtra] = useState({});
  const [boardingPasses, setBoardingPasses] = useState([]);
  const [flightStats, setFlightStats] = useState([]);
  const [boardingPassesTableCells, setBoardingPassesTableCells] = useState([]);
  const [show, setShow] = useState(false);
  const [modalMode, setModalMode] = useState("");
  const [toggleRefresh, setToggleRefresh] = useState(false);

  const convertBooleanToYesNo = (boolean) => {
    return boolean ? "Y" : "N";
  };

  const createTableCells = (objects) => {
    let array = [];
    for (const property in objects) {
      let obj = {
        Name: `${objects[property].firstname} ${objects[property].lastname}`,
        Email: `${objects[property].email}`,
        "Contact Number": `${objects[property].contact_number}`,
        "Baggage Type": `${objects[property].baggage_type}`,
        Food: convertBooleanToYesNo(objects[property].food),
        Beverage: convertBooleanToYesNo(objects[property].beverage),
        Movie: convertBooleanToYesNo(objects[property].movie),
        WIFI: convertBooleanToYesNo(objects[property].wifi),
        // Edit: (
        //   <Button
        //     border="none"
        //     backgroundColor="#00468B"
        //     color="white"
        //     height="25px"
        //     onClick={() => {
        //       this.clickedEditPassengerExtra.bind(this, {
        //         passengerID: objects[property].passenger_id,
        //         Food: objects[property].food,
        //         Beverage: objects[property].beverage,
        //         Movie: objects[property].movie,
        //         WIFI: objects[property].wifi,
        //       });
        //     }}
        //     radius="5px"
        //     width="60%"
        //   >
        //     Edit
        //   </Button>
        // ),
      };
      array.push(obj);
    }
    return array;
  };

  const getPassengersBoardingPasses = async () => {
    const res = await axios.get(
      `http://127.0.0.1:5000/api/v1/boarding-passes/flight/${flightID}`
    );
    // console.log(res.data.data.boardingPasses[0]);
    setBoardingPassesTableCells(createTableCells(res.data.data.boardingPasses));
    setBoardingPasses(res.data.data.boardingPasses);
  };

  const getFlightStats = async () => {
    const res = await axios.get(
      `http://127.0.0.1:5000/api/v1/flights/stats/${flightID}`
    );
    setFlightStats(res.data.data.flightStats);
  };

  useEffect(() => {
    getPassengersBoardingPasses();
    getFlightStats();
  }, [toggleRefresh]);

  const toggleModal = () => setShow(!show);

  const clickedEditFlight = () => {
    setModalMode("Edit Flight");
    toggleModal();
  };

  const toggleRefreshPage = () => {
    setToggleRefresh(!toggleRefresh);
  };

  const clickedEditPassengerExtra = (selectedPassengerExtraJson) => {
    console.log(selectedPassengerExtraJson, "CLICKED EXTRA");
    setSelectedPassengerExtra(selectedPassengerExtraJson);
    setModalMode("Edit Passenger Extra");
    toggleModal();
  };

  let modalContent = null;

  if (modalMode === "Edit Flight") {
    modalContent = (
      <EditFlightForm
        flightID={flightID}
        flightStats={flightStats}
        toggleModal={toggleModal}
        toggleRefreshPage={toggleRefreshPage}
      />
    );
  }

  return (
    <div className={styles["flight-dashboard-container"]}>
      <Modal show={show} modalClosed={toggleModal} noPadding>
        {modalContent}
      </Modal>
      <div className={styles["flight-stats-container"]}>
        <FlightStatsCard
          title={"Stats"}
          flightStats={flightStats}
          clicked={clickedEditFlight}
        />
      </div>
      <div className={styles["crew-container"]}>
        <FlightDashboardCard
          title={"Crew"}
          headers={["Name", "Email", "Contact Number"]}
          data={[
            {
              name: "Nicholas Moreno",
              email: "nickmoreno0@gmail.com",
              contant_number: "832-111-2238",
            },
            {
              name: "Austin Moreno",
              email: "austinmoreno0@gmail.com",
              contant_number: "832-000-1138",
            },
          ]}
          h
        />
      </div>
      <div className={styles["passengers-container"]}>
        <FlightDashboardCard
          title={"Passengers Boarding Pass"}
          headers={[
            "Name",
            "Email",
            "Contact Number",
            "Baggage Type",
            "Food",
            "Beverage",
            "Movie",
            "WIFI",
            // "Edit",
          ]}
          data={boardingPassesTableCells}
        />
      </div>
      FlightID: {flightID}
    </div>
  );
};

export default FlightDashboard;
