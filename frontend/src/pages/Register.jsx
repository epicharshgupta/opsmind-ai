import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Register() {
  const { login } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
  if (!name || !email || !password) {
    alert("All fields are required");
    return;
  }

  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  const userExists = existingUsers.find(user => user.email === email);

  if (userExists) {
    alert("User already registered. Please login.");
    return;
  }

  const newUser = { name, email, password };

  localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));

  alert("Registration successful! Please login.");
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
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg px-4 py-2 mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg px-4 py-2 mb-6"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Register
        </button>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;