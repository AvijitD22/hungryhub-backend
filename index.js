const express = require("express");
const mongoDB = require("./database");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

mongoDB();
app.use(express.json());

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/FoodData"));
app.use("/api", require("./Routes/OrderData"));
app.use("/api", require("./Routes/MyOrders"));

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}...`);
});
