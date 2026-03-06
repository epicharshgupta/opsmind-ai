const express = require("express");
const router = express.Router();

const User = require("../models/User");
const SOP = require("../models/SOP");

router.get("/stats", async (req, res) => {

  try {

    const totalUsers = await User.countDocuments();
    const totalDocuments = await SOP.countDocuments();

    res.json({
      users: totalUsers,
      documents: totalDocuments
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


// Get all users
router.get("/users", async (req, res) => {

  const users = await User.find().select("-password");

  res.json(users);

});


// Get all documents
router.get("/documents", async (req, res) => {

  try {

    const documents = await SOP.find().select("filename uploadedAt");

    res.json(documents);

  } catch (error) {

    console.log(error);
    res.status(500).json({
      error: error.message
    });

  }

});
module.exports = router;