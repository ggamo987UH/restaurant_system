import express from "express";

import { getAircrafts } from "../controllers/aircraft.controller";

const router = express.Router();

router.get("/", getAircrafts);

export default router;
