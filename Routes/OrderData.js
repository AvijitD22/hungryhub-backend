const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/orderData", async (req, res) => {
  let data = req.body.orderData;
  await data.splice(0, 0, { OrderDate: req.body.orderDate });

  let eId = await Order.findOne({ email: req.body.email });
  if (eId === null) {
    try {
      await Order.create({
        email: req.body.email,
        orderData: [data],
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error" + error.message);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { orderData: data } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      res.send("Server Error", error.message);
    }
  }
});

module.exports = router;
