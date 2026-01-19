import express from "express";
import { loginUser, registerUser } from "../controllers/auth.ctrl.js";

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register user
 * @access  Public
 */
router.post("/register", registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post("/login", loginUser);

export default router;
