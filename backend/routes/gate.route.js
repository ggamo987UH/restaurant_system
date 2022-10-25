import express from "express";

import { getGates } from "../controllers/gate.controller";

const router = express.Router();

router.get("/", getGates);

export default router;
