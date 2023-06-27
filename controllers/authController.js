const User = require("../models/User");
const { hashPass, comparePass } = require("../helpers/authHelper.js");
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
    await user.save();
    res.status(201).send({
      success: true,
      message: "successfully registered",
      user,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error registering user",
      error,
    });
  }
};

// login api
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(404)
        .send({ success: false, message: "Invalid email or password" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).send({ message: "please register first" });
    }
    const isMatch = await comparePass(password, user.password);
    if (!isMatch) {
      res.status(200).send({ success: false, message: "Invalid password" });
    }
    const token = await jwt.sign({ _id: user._id }, process.env.RANDOM_KEY);
    res.status(200).send({
      success: true,
      message: "login successful",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "error logging in",
      error,
    });
  }
};

module.exports = { registerContoller, loginController };
