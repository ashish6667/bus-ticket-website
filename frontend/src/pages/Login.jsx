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

    //  Get all users array
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user by email
    const user = users.find(u => u.email === form.email);

    if (!user) {
      toast.error("User not found. Please sign up first.");
      navigate("/signup");
      return;
    }

    if (user.password !== form.password) {
      toast.error("Incorrect password");
      return;
    }

    //  Save current logged-in user
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    //  Update navbar
    window.dispatchEvent(new Event("authChange"));

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
