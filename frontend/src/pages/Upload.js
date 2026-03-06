import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Upload() {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("HR");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    
    if (!file) {
      alert("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);
    formData.append("userId", user?._id);
    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/upload", formData);

      setTimeout(() => {
        setLoading(false);
        navigate("/chat");
      }, 1500);

    } catch (error) {
      setLoading(false);
      alert("Upload failed");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex items-center justify-center pt-40 px-4">
        <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">

          <h2 className="text-2xl font-bold mb-6 text-center">
            Upload SOP Document
          </h2>

          {/* Drag Area */}
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-blue-500 transition">
            <span className="text-gray-500">
              {file ? file.name : "Click to upload or drag file here"}
            </span>

            <input
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>

          {/* Category */}
          <select
            className="mt-6 w-full border rounded-lg px-4 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="IT">IT</option>
            <option value="Operations">Operations</option>
          </select>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 hover:scale-105 transition"
          >
            Upload & Continue
          </button>

        </div>
      </div>
    </div>
  );
}

export default Upload;