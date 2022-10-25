import pool from "../db/pool.js";
import { successMessage, errorMessage, status } from "../helpers/status";

const getAircrafts = (req, res) => {
  const sql = `
    SELECT
        *
    FROM
        "Aircraft"`;

  let aircrafts = [];
  pool
    .query(sql)
    .then((queryRes) => {
      aircrafts = queryRes.rows;

      res.status(status.success).json({
        status: "success",
        result: aircrafts.length,
        data: {
          aircrafts,
        },
      });
    })
    .catch((queryErr) => {
      console.log(queryErr);
      errorMessage.error = "Unable to retrieve aircraft's";
      return res.status(status.error).send(errorMessage);
    });
};

export { getAircrafts };
