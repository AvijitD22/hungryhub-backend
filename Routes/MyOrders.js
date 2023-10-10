const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/myOrders", async (req, res) => {
  try {
    let data = await Order.findOne({ email: req.body.email });
    res.send(data?.orderData);
  } catch (error) {
    res.send("Server Error", error.message);
  }
});

module.exports = router;
