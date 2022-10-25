import express from "express";

import {
  getFlights,
  createFlight,
  updateFlight,
  getFlightStats,
  updateFlightMaintenance,
} from "../controllers/flights.controller";

const router = express.Router();

router.get("/", getFlights).post("/", createFlight);

router.route("/:flightID").patch(updateFlight);

router.route("/maintenance/:flightID").patch(updateFlightMaintenance);

router.get("/stats/:flightID", getFlightStats);

export default router;
