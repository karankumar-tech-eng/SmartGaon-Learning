import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const inputClass =
    "w-full border border-white/10 p-3 rounded-lg mb-4 bg-slate-900 text-white placeholder-slate-400 outline-none focus:border-blue-500";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      const userRole = response.data.user.role;

      localStorage.setItem("smartgaonUser", JSON.stringify(response.data.user));
      localStorage.setItem("smartgaonToken", response.data.token);
      localStorage.setItem("smartgaonRole", userRole);

      setMessage(response.data.message);

      setTimeout(() => {
        if (userRole === "Admin") navigate("/admin");
        else if (userRole === "Teacher") navigate("/teacher-dashboard");
        else navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 text-white">
      <div className="bg-white/10 border border-white/10 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Login
        </h1>

        <input
          className={inputClass}
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />

        <input
          className={inputClass}
          placeholder="Password"
          type="password"
          name="password"
          onChange={handleChange}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>

        {message && (
          <p className="text-center mt-4 text-blue-400">{message}</p>
        )}

        <p className="text-center mt-4 text-slate-300">
          Don’t have account?{" "}
          <Link to="/register" className="text-blue-400 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}