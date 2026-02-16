require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const uploadRoute = require("./routes/uploadRoute");
const searchRoute = require("./routes/searchRoute");

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.listen(process.env.PORT, () => {
  console.log("Server running");
});
app.use("/api", uploadRoute);
app.use("/api", searchRoute);
