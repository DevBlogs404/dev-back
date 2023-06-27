const express = require("express");
const {
  registerContoller,
  loginController,
} = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleWare");

const router = express.Router();

router.post("/register", registerContoller);
router.post("/login", loginController);

module.exports = router;
