import pool from "../db/pool.js";
import { successMessage, errorMessage, status } from "../helpers/status";

const getBoardingPassesByFlight = async (req, res) => {
  const flightID = req.params.flightID;
  const sql = `
    SELECT 
        "Boarding Pass".boarding_pass_id, 
        "Passenger".firstname, 
        "Passenger".lastname, 
        "Passenger".email, 
        "Passenger".contact_number, 
        "Baggage Type".baggage_type, 
        "Boarding Pass".has_checked_in, 
        "Boarding Pass".has_boarded
    FROM 
        "Boarding Pass"
    INNER JOIN "Passenger"
    ON 
        "Boarding Pass".passenger_id = "Passenger".passenger_id
    INNER JOIN "Baggage Type"
    ON 
        "Boarding Pass".baggage_type_id = "Baggage Type".baggage_type_id
    WHERE 
        flight_id=$1;`;

  let boardingPasses = [];
  pool
    .query(sql, [flightID])
    .then((queryRes) => {
      boardingPasses = queryRes.rows;

      res.status(status.success).json({
        status: "success",
        result: boardingPasses.length,
        data: {
          boardingPasses,
        },
      });
    })
    .catch((queryErr) => {
      console.log(queryErr);
      errorMessage.error = "Unable to retrieve boarding passes";
      return res.status(status.error).send(errorMessage);
    });
};

export { getBoardingPassesByFlight };
