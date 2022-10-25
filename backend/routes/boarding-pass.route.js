import express from "express";

import { getBoardingPassesByFlight } from "../controllers/boarding-pass.controller";

const router = express.Router();

router.get("/flight/:flightID", getBoardingPassesByFlight);

export default router;
