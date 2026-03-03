import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

   const handleLogin = () => {
  if (!email || !password) {
    alert("Enter email and password");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const validUser = users.find(
    user => user.email === email && user.password === password
  );

  if (!validUser) {
    alert("Invalid credentials or user not registered");
    return;
  }

  login(validUser);   // 🔥 Pass full user object
};

    return (
        <>
            <Navbar/>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Login to OpsMind AI
                </h2>

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
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                >
                    Login
                </button>
                <p className="text-center mt-4 text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-600 font-semibold">
                        Register
                    </Link>
                </p>
            </div>
        </div>
        </>
    );
}

export default Login;