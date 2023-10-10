const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "qwertyuioplkjhgfdsazxcvbnm!)@(#*";
const tokenExpiration = "1d";

router.post(
  "/createuser",
  [
    body("email", "Not Valid Email").isEmail(),
    body("name", "Not Valid Name").isLength({ min: 6 }),
    body("password", "Incorrect Password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let bcrypt = require("bcryptjs");
    let userEmail = req.body.email.toLowerCase();
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, async function (err, hash) {
        try {
          await User.create({
            name: req.body.name,
            email: userEmail,
            password: hash,
            location: req.body.location,
          });
          res.json({ success: true });
        } catch (err) {
          console.log(err.message);
          res.json({ success: false });
        }
      });
    });
  }
);

router.post(
  "/loginuser",
  [
    body("email", "Not Valid Email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email.toLowerCase();
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Enter Correct Credentials" });
      }

      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        userData.password
      );

      if (!isPasswordValid) {
        return res.status(400).json({ errors: "Enter Correct Credentials" });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecret, {
        expiresIn: tokenExpiration,
      });
      res.json({ success: true, authToken: authToken });
    } catch (err) {
      console.log(err.message);
      res.json({ success: false });
    }
  }
);

module.exports = router;
