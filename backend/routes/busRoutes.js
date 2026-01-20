import express from "express";
import {
  getAllBuses,
  createBus,
} from "../controllers/bus.ctrl.js";

const router = express.Router();


 //route   GET /api/buses
 //desc    Get all buses
 //access  Public
 
router.get("/", getAllBuses);


 //route   POST /api/buses
 //desc    Create a new bus (admin later)
 //access  Public (can be protected later)
 
router.post("/", createBus);

export default router;
