const express = require("express");
const router = express.Router();
const ServiceRequest = require("../models/ServiceRequest");
const { protect } = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

router.get("/", protect, async (req, res) => {
  try {
    const requests = await ServiceRequest.find({ userId: req.user.id })
      .populate("orderId", "orderId")
      .sort({ requestDate: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", protect, async (req, res) => {
  const { requestType, orderId, reason } = req.body;
  try {
    const newRequest = new ServiceRequest({
      userId: req.user.id,
      requestType,
      orderId,
      reason,
      status: "PENDING",
    });

    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
