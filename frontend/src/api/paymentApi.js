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

  // Use environment variable for backend URL
  const API_URL = import.meta.env.VITE_API_BASE_URL + "/api";

  const res = await fetch(
    `${API_URL}/payments/create-checkout-session`,
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
