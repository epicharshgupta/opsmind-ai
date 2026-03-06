import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import API_BASE_URL from "../config/api";

function Login() {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        if (!email || !password) {
            alert("Enter email and password");
            return;
        }

        try {

            const res = await axios.post(
                `${API_BASE_URL}/api/auth/login`,
                {
                    email,
                    password
                }
            );

            const user = res.data.user;

            // Save user in context
            login(user);

            // redirect to upload page
            if (user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/upload");
            }

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Login failed"
            );

        }

    };

    return (
        <>
            <Navbar />

            <div className="flex items-center justify-center min-h-screen bg-gray-100">

                <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">

                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Login to OpsMind AI
                    </h2>

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
                        className="w-full border rounded-lg px-4 py-2 mb-6"
                        value={password}
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
                        <Link
                            to="/register"
                            className="text-blue-600 font-semibold"
                        >
                            Register
                        </Link>
                    </p>

                </div>

            </div>
        </>
    );
}

export default Login;