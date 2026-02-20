import React, { useState } from "react";
import axios from "axios";

function UploadSOP() {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("HR");
  const [message, setMessage] = useState("");

  const uploadFile = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );

      setMessage(res.data.message);
    } catch (err) {
      setMessage("Upload failed.");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload SOP Document</h2>

      <input
        type="file"
        onChange={e => setFile(e.target.files[0])}
      />

      <br /><br />

      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
      >
        <option>HR</option>
        <option>Finance</option>
        <option>Tech</option>
      </select>

      <br /><br />

      <button onClick={uploadFile}>
        Upload SOP
      </button>

      <p>{message}</p>
    </div>
  );
}

export default UploadSOP;