import pool from "../db/pool.js";
import { successMessage, errorMessage, status } from "../helpers/status";

const getFlights = async (req, res) => {
  const sql = `
  SELECT
    "Flight".flight_id,
    "Aircraft".model as aircraft_model,
    "Flight".available_seats,
    "Flight".takeoff_timestamp,
    "Flight".landing_timestamp,
    "Gate".gate,
    "Departure Airport".airport_name as departure_airport_name,
    "Departure Airport".city as departure_airport_city,
    "Arrival Airport".airport_name as arrival_airport_name,
    "Arrival Airport".city as arrival_airport_city,
    "Flight".status,
    to_char("Flight".date, 'MM-DD-YYYY') as date,
    "Flight".time,
    "Flight".duration
  FROM
    "Flight"
  INNER JOIN
    "Aircraft"
  ON 
    "Flight".aircraft_id = "Aircraft".aircraft_id
  INNER JOIN
    "Gate"
  ON 
    "Flight".gate_id = "Gate".gate_id
  INNER JOIN 
    "Airport" as "Departure Airport"
  ON
    "Flight".departure_airport_id = "Departure Airport".airport_id
  INNER JOIN 
    "Airport" as "Arrival Airport"
  ON
    "Flight".arrival_airport_id = "Arrival Airport".airport_id
  ORDER BY 
    date DESC;
  `;

  let flights = [];
  await pool
    .query(sql)
    .then((queryRes) => {
      flights = queryRes.rows;
      console.log(flights);
      res.status(status.success).json({
        status: "success",
        result: flights.length,
        data: {
          flights,
        },
      });
    })
    .catch((queryErr) => {
      console.log(queryErr);
      errorMessage.error = "Unable to retrieve flights";
      return res.status(status.error).send(errorMessage);
    });
};

const createFlight = async (req, res) => {
  const {
    aircraftId,
    availableSeats,
    date,
    time,
    departureAirportId,
    arrivalAirportId,
    flightStatus,
    duration,
    gateId,
  } = req.body;

  let errorMessage = "";
  // ERROR HANDLING
  if (departureAirportId === arrivalAirportId) {
    errorMessage +=
      "Departure Airport and Arrival Airport cannot be identical.\n";
  }

  // Check if flight date is in the past
  const today = new Date();
  const flightDate = new Date(date);
  console.log(today, flightDate);
  if (today >= flightDate) {
    errorMessage += "Flight date is in the past.";
  }

  // RETURN ERROR
  if (errorMessage.length != 0) {
    // console.log(errorMessage);
    return res.status(status.error).send(`Error:\n${errorMessage}`);
  }

  const sql = `
  INSERT INTO "Flight"
    (aircraft_id, available_seats, gate_id, departure_airport_id, arrival_airport_id, status, date, time, duration)
  VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`;
  await pool
    .query(sql, [
      aircraftId,
      availableSeats,
      gateId,
      departureAirportId,
      arrivalAirportId,
      flightStatus,
      date,
      time,
      duration,
    ])
    .then((queryRes) => {
      successMessage.count = queryRes.rowCount;
      successMessage.data = queryRes.rows[0];
      return res.status(status.created).send(successMessage);
    })
    .catch((queryErr) => {
      console.log(queryErr);
      errorMessage.error = "Unable to create flight";
      return res.status(status.error).send(errorMessage);
    });
};

const updateFlight = async (req, res) => {
  const flightID = req.params.flightID;
  const {
    date,
    time,
    departureAirportId,
    arrivalAirportId,
    flightStatus,
    duration,
    gateId,
  } = req.body;

  const sql = `
  UPDATE 
    "Flight"
  SET 
    date=$2, time=$3, departure_airport_id=$4, 
    arrival_airport_id=$5, status=$6, duration=$7, 
    gate_id=$8
  WHERE 
    flight_id=$1;`;

  await pool
    .query(sql, [
      flightID,
      date,
      time,
      departureAirportId,
      arrivalAirportId,
      flightStatus,
      duration,
      gateId,
    ])
    .then((queryRes) => {
      // console.log(queryRes);
      // successMessage.count = queryRes.rowCount;
      // successMessage.response = "Success";
      return res.status(status.success).send(successMessage);
    })
    .catch((queryErr) => {
      console.log(queryErr);
      errorMessage.error = "Unable to Update flight";
      return res.status(status.error).send(errorMessage);
    });
};

const updateFlightMaintenance = async (req, res) => {
  const flightID = req.params.flightID;
  const { hasRefilled, hasCleaned } = req.body;

  let isFlightReady = 0;
  if (hasRefilled == "1" && hasCleaned == "1") {
    isFlightReady = 1;
  }

  const sql = `
  UPDATE 
    "Flight Maintenance"
  SET
    is_flight_ready=$2, has_refilled=$3, has_cleaned=$4
  WHERE 
    flight_id=$1;`;

  await pool
    .query(sql, [flightID, isFlightReady, hasRefilled, hasCleaned])
    .then((queryRes) => {
      // console.log(queryRes);
      // successMessage.count = queryRes.rowCount;
      // successMessage.message = "Success";
      return res.status(status.success).send(successMessage);
    })
    .catch((queryErr) => {
      console.log(queryErr);
      errorMessage.error = "Unable to Update flight";
      return res.status(status.error).send(errorMessage);
    });
};

const getFlightStats = (req, res) => {
  const flightID = req.params.flightID;
  const sql = `
  SELECT
    "Flight".flight_id,
    "Aircraft".model as aircraft_model,
    "Flight".available_seats,
    "Flight".takeoff_timestamp,
    "Flight".landing_timestamp,
    "Gate".gate_id,
    "Gate".gate,
    "Departure Airport".airport_id as departure_airport_id,
    "Departure Airport".airport_name as departure_airport_name,
    "Departure Airport".city as departure_airport_city,
    "Arrival Airport".airport_id as arrival_airport_id,
    "Arrival Airport".airport_name as arrival_airport_name,
    "Arrival Airport".city as arrival_airport_city,
    "Flight".status,
    to_char("Flight".date, 'MM-DD-YYYY') as date,
    "Flight".time,
    "Flight".duration,
    CASE WHEN "Flight Maintenance".is_flight_ready THEN 'Y' ELSE 'N' END as is_flight_ready,
    CASE WHEN "Flight Maintenance".has_refilled THEN 'Y' ELSE 'N' END as has_refilled,
    CASE WHEN "Flight Maintenance".has_cleaned THEN 'Y' ELSE 'N' END as has_cleaned
  FROM
    "Flight"
  INNER JOIN
    "Aircraft"
  ON 
    "Flight".aircraft_id = "Aircraft".aircraft_id
  INNER JOIN
    "Gate"
  ON 
    "Flight".gate_id = "Gate".gate_id
  INNER JOIN 
    "Airport" as "Departure Airport"
  ON
    "Flight".departure_airport_id = "Departure Airport".airport_id
  INNER JOIN 
    "Airport" as "Arrival Airport"
  ON
    "Flight".arrival_airport_id = "Arrival Airport".airport_id
  INNER JOIN  
    "Flight Maintenance"
  ON 
    "Flight".flight_id = "Flight Maintenance".flight_id
  WHERE
    "Flight".flight_id = $1;`;

  let flightStats = [];
  pool
    .query(sql, [flightID])
    .then((queryRes) => {
      flightStats = queryRes.rows[0];

      res.status(status.success).json({
        status: "success",
        result: flightStats.length,
        data: {
          flightStats,
        },
      });
    })
    .catch((queryErr) => {
      console.log(queryErr);
      errorMessage.error = "Unable to retrieve flight stats";
      return res.status(status.error).send(errorMessage);
    });
};
export {
  getFlights,
  createFlight,
  updateFlight,
  getFlightStats,
  updateFlightMaintenance,
};
