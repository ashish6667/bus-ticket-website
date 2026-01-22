import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../api/bookingApi";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const busId = params.get("busId");
    const seats = JSON.parse(params.get("seats") || "[]");
    const name = params.get("name");
    const phone = params.get("phone");

    if (!busId || !seats.length || !name || !phone) {
      toast.error("No booking data found");
      navigate("/");
      return;
    }

    const confirmBooking = async () => {
      try {
        for (let seat of seats) {
          await createBooking({ busId, seatNumber: seat, name, phone });
        }
        toast.success("Payment successful! Booking confirmed 🎉");
        navigate("/my-bookings");
      } catch (err) {
        toast.error("Booking failed after payment");
      }
    };

    confirmBooking();
  }, [navigate]);

  return <p>Finalizing your booking, please wait...</p>;
};

export default PaymentSuccess;
