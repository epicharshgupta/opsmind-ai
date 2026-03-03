import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function Landing() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <section className="flex flex-col justify-center items-center text-center pt-40 px-4">
        <h1 className="text-5xl font-bold mb-6">
          Enterprise SOP Assistant
        </h1>

        <p className="text-gray-600 max-w-xl mb-10">
          Upload, search and query your SOP documents using AI.
          Secure, fast and enterprise-ready.
        </p>

        {/* Buttons */}
        {!user ? (
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition"
            >
              Register
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/upload")}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl text-lg shadow-lg hover:scale-105 transition"
          >
            Go to Dashboard
          </button>
        )}
      </section>
    </div>
  );
}

export default Landing;