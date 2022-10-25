import { useEffect, useState } from "react";

import axios from "axios";
import moment from "moment";
import styles from "./EditPassengerExtraForm.module.css";
import InputField from "../../UI/InputField/InputField";
import Button from "../../UI/Button/Button";
import time from "../../../helpers/time";

const yesNoToOneAndZeros = (value) => {
  return value === "Y" ? "1" : "0";
};

const EditPassengerExtra = (props) => {
  const { flightID, flightStats, toggleModal } = props;
  const [aircrafts, setAircrafts] = useState([]);
  const [airports, setAirports] = useState([]);
  const [gates, setGates] = useState([]);
  const yesNo = [
    { value: "1", option: "Y" },
    { value: "0", option: "N" },
  ];
  const [form, setForm] = useState({
    date: moment(flightStats.date, "MM-DD-YYYY").format("YYYY-MM-DD"),
    time: flightStats.time,
    departureAirportId: flightStats.departure_airport_id,
    arrivalAirportId: flightStats.arrival_airport_id,
    flightStatus: flightStats.status,
    duration: flightStats.duration,
    gateId: flightStats.gate_id,
    hasRefilled: yesNoToOneAndZeros(flightStats.has_refilled),
    hasCleaned: yesNoToOneAndZeros(flightStats.has_cleaned),
  });

  const onChange = (event) => {
    console.log(
      event.target.name,
      event.target.value,
      { ...form, [event.target.name]: event.target.value },
      "form"
    );
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleEditFlightSubmit = (event) => {
    event.preventDefault();
    axios
      .patch(`http://127.0.0.1:5000/api/v1/flights/${flightID}`, form)
      .then((res) => {
        toggleModal();
      })
      .catch((e) => {
        alert(e.response.data);
      });
  };

  // console.log(form);

  const getFormData = async () => {
    await axios
      .get("http://127.0.0.1:5000/api/v1/aircrafts/")
      .then((aircraftsRes) => {
        setAircrafts([aircraftsRes.data.data.aircrafts]);
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
        label={"Flight Date"}
        type={"date"}
        name={"date"}
        value={form.date}
        placeholder={"Date"}
        onChange={onChange}
      />
      <InputField
        label={"Flight Time"}
        type={"select"}
        name={"time"}
        value={form.time}
        options={time}
        onChange={onChange}
      />
      <InputField
        label={"Gate"}
        type={"select"}
        name={"gateId"}
        value={form.gateId}
        options={gates[0]}
        optionValueKey={"gate_id"}
        optionKey={"gate_id"}
        optionJsonKey={"gate"}
        onChange={onChange}
      />
      <InputField
        label={"Status"}
        type={"select"}
        name={"flightStatus"}
        value={form.status}
        options={["Delayed", "On Time"]}
        onChange={onChange}
      />
      <InputField
        label={"From"}
        type={"select"}
        name={"departureAirportId"}
        value={form.departureAirportId}
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
        value={form.arrivalAirportId}
        options={airports[0]}
        optionValueKey={"airport_id"}
        optionKey={"airport_name"}
        optionJsonKey={"airport_name"}
        onChange={onChange}
      />
      <InputField
        label={"Flight Refilled"}
        type={"select"}
        name={"hasRefilled"}
        value={form.hasRefilled}
        options={yesNo}
        optionValueKey={"value"}
        optionKey={"value"}
        optionJsonKey={"option"}
        onChange={onChange}
      />
      <InputField
        label={"Flight Cleaned"}
        type={"select"}
        name={"hasCleaned"}
        value={form.hasCleaned}
        options={yesNo}
        optionValueKey={"value"}
        optionKey={"value"}
        optionJsonKey={"option"}
        onChange={onChange}
      />
      <div className={styles["button-container"]}>
        <Button
          border="none"
          backgroundColor="#00468B"
          color="white"
          height="45px"
          onClick={handleEditFlightSubmit}
          radius="5px"
          width="%"
        >
          Edit Flight
        </Button>
      </div>
    </form>
  );
};

export default EditPassengerExtra;
