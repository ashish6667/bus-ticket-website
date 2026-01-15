import express from "express";
import { getAllBuses, createBus } from "../controllers/bus.ctrl.js";

const router = express.Router();

router.get("/", getAllBuses);
router.post("/", createBus);

export default router;
