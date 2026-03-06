require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const uploadRoute = require("./routes/uploadRoute");
const searchRoute = require("./routes/searchRoute");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// API Routes
app.use("/api", uploadRoute);
app.use("/api", searchRoute);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});