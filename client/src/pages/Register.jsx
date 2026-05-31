import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    studentClass: "",
    language: "English",
    role: "Student",
  });

  const [message, setMessage] = useState("");

  const inputClass =
    "w-full border border-white/10 p-3 rounded-lg mb-4 bg-slate-900 text-white placeholder-slate-400 outline-none focus:border-blue-500";

  const selectClass =
    "w-full border border-white/10 p-3 rounded-lg mb-4 bg-slate-900 text-white outline-none focus:border-blue-500";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 text-white">
      <div className="bg-white/10 border border-white/10 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Register
        </h1>

        <input
          className={inputClass}
          placeholder="Full Name"
          name="fullName"
          onChange={handleChange}
        />

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

        <input
          className={inputClass}
          placeholder="Class / Standard"
          name="studentClass"
          onChange={handleChange}
        />

        <select
          className={selectClass}
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option>Student</option>
          <option>Teacher</option>
          <option>Admin</option>
        </select>

        <select
          className={selectClass}
          name="language"
          value={formData.language}
          onChange={handleChange}
        >
          <option>English</option>
          <option>Hindi</option>
          <option>Kannada</option>
          <option>Bhojpuri</option>
          <option>Tamil</option>
        </select>

        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Create Account
        </button>

        {message && (
          <p className="text-center mt-4 text-blue-400">{message}</p>
        )}

        <p className="text-center mt-4 text-slate-300">
          Already have account?{" "}
          <Link to="/login" className="text-blue-400 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}