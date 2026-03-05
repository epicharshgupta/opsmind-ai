import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function Landing() {

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-blue-900 text-white">

      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center text-center pt-40 px-6">

        <h1 className="text-6xl font-bold mb-6">
          Enterprise SOP Assistant
        </h1>

        <p className="text-gray-300 max-w-xl mb-10 text-lg">
          Upload, search and query your SOP documents using AI. 
          Secure, fast and enterprise-ready.
        </p>

        {/* Buttons */}
        {!user ? (
          <div className="flex gap-6">

            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 px-7 py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="border border-blue-500 px-7 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:border-blue-600 transition"
            >
              Register
            </button>

          </div>
        ) : (

          <button
            onClick={() => navigate("/upload")}
            className="bg-blue-600 px-8 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition shadow-lg"
          >
            Go to Dashboard
          </button>

        )}

      </div>

    </div>
  );
}

export default Landing;