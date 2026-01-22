/**
 * Create Stripe Checkout Session
 */
export const createCheckoutSession = async ({
  amount,
  busId,
  seats,
  passenger,
}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    "http://localhost:5000/api/payments/create-checkout-session",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({
        amount,
        busId,
        seats,
        passenger,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Stripe session failed");
  }

  // Stripe Checkout redirect
  window.location.href = data.url;
};
