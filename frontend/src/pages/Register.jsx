import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleRegister = async () => {

    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {

      const res = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        {
          name,
          email,
          password,
          role
        }
      );

      alert(res.data.message);

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border rounded-lg px-4 py-2 mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg px-4 py-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg px-4 py-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Role Selection */}
        <select
          className="w-full border rounded-lg px-4 py-2 mb-6"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Register
        </button>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;