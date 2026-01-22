import Stripe from "stripe";
import Booking from "../models/booking.model.js"; // adjust path to your Booking model
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Stripe Checkout Session
export const createCheckoutSession = async (req, res) => {
  try {
    const { amount, busId, seats, passenger } = req.body;

    if (!amount || !busId || !seats || !passenger) {
      return res.status(400).json({ message: "Missing booking information" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Bus Seat Booking - Seats: ${seats.join(", ")}`,
              description: `Passenger: ${passenger.name}, Phone: ${passenger.phone}`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        busId,
        seats: JSON.stringify(seats),
        passengerName: passenger.name,
        passengerPhone: passenger.phone,
        passengerEmail: passenger.email || "",
      },
      success_url: `${process.env.FRONTEND_URL}/payment-success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error);
    res.status(500).json({ message: "Stripe session failed" });
  }
};

// Stripe Webhook to confirm payment
export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const busId = session.metadata.busId;
      const seats = JSON.parse(session.metadata.seats);
      const passenger = {
        name: session.metadata.passengerName,
        phone: session.metadata.passengerPhone,
        email: session.metadata.passengerEmail,
      };

      // Create bookings in DB for each seat
      for (let seat of seats) {
        await Booking.create({
          busId,
          seatNumber: seat,
          name: passenger.name,
          phone: passenger.phone,
          email: passenger.email,
        });
      }

      console.log(`Booking confirmed for ${passenger.name}, seats: ${seats.join(", ")}`);
    } catch (err) {
      console.error("Failed to create bookings from webhook:", err);
    }
  }

  // Return 200 to acknowledge receipt of the event
  res.json({ received: true });
};
