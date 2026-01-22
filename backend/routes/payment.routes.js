import express from "express";
import protect from "../middlewares/auth.js";
import {
  createCheckoutSession,
  handleStripeWebhook,
} from "../controllers/payment.ctrl.js";

const router = express.Router();

//  Stripe webhook MUST be before express.json()
// and MUST be public (no auth)
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);

//  Create checkout session (protected)
router.post(
  "/create-checkout-session",
  protect,
  createCheckoutSession
);

export default router;
