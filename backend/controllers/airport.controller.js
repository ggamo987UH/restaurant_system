import pool from "../db/pool.js";
import { successMessage, errorMessage, status } from "../helpers/status";

const getAirports = (req, res) => {
  const sql = `
    SELECT
        *
    FROM
        "Airport"`;

  let airports = [];
  pool
    .query(sql)
    .then((queryRes) => {
      airports = queryRes.rows;

      res.status(status.success).json({
        status: "success",
        result: airports.length,
        data: {
          airports: airports,
        },
      });
    })
    .catch((queryErr) => {
      console.log(queryErr);
      errorMessage.error = "Unable to retrieve airports's";
      return res.status(status.error).send(errorMessage);
    });
};

export { getAirports };
