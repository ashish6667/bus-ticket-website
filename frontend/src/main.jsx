import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";

import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { stripePromise } from "./stripe"; //  Stripe config

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Elements stripe={stripePromise}>
        <AuthProvider>
          <App />
          <Toaster position="top-right" reverseOrder={false} />
        </AuthProvider>
      </Elements>
    </BrowserRouter>
  </StrictMode>
);
