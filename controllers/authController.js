const User = require("../models/User");
const { hashPass, comparePass } = require("../helpers/authHelper.js");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

//register api
const registerContoller = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(200).send({
        success: true,
        message: "Already registered, please login",
      });
    }
    const newHashedPass = await hashPass(password);
    let user = new User({ email, password: newHashedPass });
    user = await user.save();
    res.status(201).send({
      success: true,
      message: "successfully registered",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error registering user",
      error:error.message
    });
  }
};

//login api
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid email or password" });
    }
    const user = await User.findOne({ email: email });
    if(!user) return  res.status(400).json({ success: false, message: "User does not exist" });
    const isMatch = await comparePass(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({id:user._id}, process.env.RANDOM_KEY);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        email: user.email,
      },
      token,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message,
    });
  }
};


module.exports = { registerContoller, loginController };
