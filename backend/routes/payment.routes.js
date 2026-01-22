import express from "express";
import { createCheckoutSession, handleStripeWebhook } from "../controllers/payment.ctrl.js";
import protect from "../middlewares/auth.js";

const router = express.Router();

// Create checkout session (requires user auth)
router.post("/create-checkout-session", protect, createCheckoutSession);

// Webhook endpoint (public, called by Stripe)
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);

export default router;
