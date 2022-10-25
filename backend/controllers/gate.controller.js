import pool from "../db/pool.js";
import { successMessage, errorMessage, status } from "../helpers/status";

const getGates = (req, res) => {
  const sql = `
    SELECT
        *
    FROM
        "Gate"`;

  let gates = [];
  pool
    .query(sql)
    .then((queryRes) => {
      gates = queryRes.rows;

      res.status(status.success).json({
        status: "success",
        result: gates.length,
        data: {
          gates: gates,
        },
      });
    })
    .catch((queryErr) => {
      console.log(queryErr);
      errorMessage.error = "Unable to retrieve gate's";
      return res.status(status.error).send(errorMessage);
    });
};

export { getGates };
