import express from "express";
import { getAllBuses } from "../controllers/bus.ctrl.js";

const router = express.Router();

router.get("/", getAllBuses);

export default router;
