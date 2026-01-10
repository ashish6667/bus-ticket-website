import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("signupUser"));

    if (!storedUser || storedUser.email !== form.email) {
      toast.error("User not found. Please sign up first.");
      navigate("/signup");
      return;
    }

    if (storedUser.password !== form.password) {
      toast.error("Incorrect password");
      return;
    }

    // ✅ SAVE LOGIN
    localStorage.setItem("loggedInUser", JSON.stringify(storedUser));

    // ✅ FORCE NAVBAR UPDATE (same tab)
    setTimeout(() => {
      window.dispatchEvent(new Event("authChange"));
    }, 0);

    toast.success("Login successful!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 mb-4"
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
