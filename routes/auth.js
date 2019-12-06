const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const {check, validationResult} = require("express-validator");
const auth = require("../middleware/auth");
const User = require("../models/User");

// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/auth
// @desc     Authenticate User and get token
// @access   Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    console.log("heeejka");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
    try {
      //find existing user by email
      let user = await User.findOne({email});
      //if user doesn't exist throw error
      if (!user) {
        return res.status(400).json({errors: [{msg: "Invalid Credentials"}]});
      }
      //compare passwords using bcrypt
      const isMatch = await bcrypt.compare(password.toString(), user.password);
      if (!isMatch) {
        return res.status(400).json({errors: [{msg: "Invalid Credentials"}]});
      }
      //if user exists and password is valid, web token is being created
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {expiresIn: 3600000},
        (err, token) => {
          if (err) throw err;
          res.json({token});
        },
      );
      res.send({token});
    } catch (err) {}
  },
);
module.exports = router;
