import express from "express";

import { getAirports } from "../controllers/airport.controller";

const router = express.Router();

router.get("/", getAirports);

export default router;
