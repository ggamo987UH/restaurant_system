import { useEffect, useState } from "react";

import axios from "axios";
import styles from "./FlightForm.module.css";
import InputField from "../../UI/InputField/InputField";
import Button from "../../UI/Button/Button";
import time from "../../../helpers/time";

const FlightForm = (props) => {
  const { toggleModal, toggleRefreshPage } = props;
  const [isLoading, setLoading] = useState(true);
  const [aircrafts, setAircrafts] = useState([]);
  const [airports, setAirports] = useState([]);
  const [gates, setGates] = useState([]);
  const [form, setForm] = useState({
    aircraftId: 0,
    availableSeats: 0,
    date: "",
    time: "",
    departureAirportId: 0,
    arrivalAirportId: 0,
    flightStatus: "",
    duration: "",
    gateId: "",
  });

  const onChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleFlightSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:5000/api/v1/flights/", form)
      .then((res) => {
        toggleRefreshPage();
        toggleModal();
      })
      .catch((e) => {
        alert(e.response.data);
      });
  };

  const getFormData = async () => {
    await axios
      .get("http://127.0.0.1:5000/api/v1/aircrafts/")
      .then((aircraftsRes) => {
        setAircrafts([aircraftsRes.data.data.aircrafts]);
        console.log(aircraftsRes.data.data, "form");
      })
      .catch((e) => {
        console.log(e);
      });

    await axios
      .get("http://127.0.0.1:5000/api/v1/airports/")
      .then((airportsRes) => {
        setAirports([airportsRes.data.data.airports]);
      })
      .catch((e) => {
        console.log(e);
      });

    await axios
      .get("http://127.0.0.1:5000/api/v1/gates/")
      .then((gateRes) => {
        setGates([gateRes.data.data.gates]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getFormData();
  }, []);

  return (
    <form className={styles["form"]}>
      <InputField
        label={"Aircraft"}
        type={"select"}
        name={"aircraftId"}
        options={aircrafts[0]}
        optionValueKey={"aircraft_id"}
        optionKey={"aircraft_id"}
        optionJsonKey={"model"}
        onChange={onChange}
      />
      <InputField
        label={"Available Seats"}
        type={"number"}
        name={"availableSeats"}
        placeholder={"Available Seats"}
        onChange={onChange}
      />
      <InputField
        label={"Flight Date"}
        type={"date"}
        name={"date"}
        placeholder={"Date"}
        onChange={onChange}
      />
      <InputField
        label={"Time"}
        type={"select"}
        name={"time"}
        options={time}
        onChange={onChange}
      />
      <InputField
        label={"From"}
        type={"select"}
        name={"departureAirportId"}
        options={airports[0]}
        optionValueKey={"airport_id"}
        optionKey={"airport_name"}
        optionJsonKey={"airport_name"}
        onChange={onChange}
      />
      <InputField
        label={"To"}
        type={"select"}
        name={"arrivalAirportId"}
        options={airports[0]}
        optionValueKey={"airport_id"}
        optionKey={"airport_name"}
        optionJsonKey={"airport_name"}
        onChange={onChange}
      />
      <InputField
        label={"Status"}
        type={"select"}
        name={"flightStatus"}
        options={["Delayed", "On Time"]}
        // optionKey={"aircraft_id"}
        // optionJsonKey={"model"}
        onChange={onChange}
      />
      <InputField
        label={"Duration"}
        type={"select"}
        name={"duration"}
        options={time}
        onChange={onChange}
      />
      <InputField
        label={"Gate"}
        type={"select"}
        name={"gateId"}
        options={gates[0]}
        optionValueKey={"gate_id"}
        optionKey={"gate_id"}
        optionJsonKey={"gate"}
        onChange={onChange}
      />
      <div className={styles["button-container"]}>
        <Button
          border="none"
          backgroundColor="#00468B"
          color="white"
          height="45px"
          onClick={handleFlightSubmit}
          radius="5px"
          width="25%"
          children="Manage"
        >
          Create Flight
        </Button>
      </div>
    </form>
  );
};

export default FlightForm;
