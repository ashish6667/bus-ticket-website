import { loadStripe } from "@stripe/stripe-js";

const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!STRIPE_KEY) {
  throw new Error("Stripe publishable key is missing");
}

export const stripePromise = loadStripe(STRIPE_KEY);
