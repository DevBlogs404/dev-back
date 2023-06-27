const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      res.status(403).send({ success: false, message: "Access denied" });
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, process.env.RANDOM_KEY);
    req.user = verified;
    next();
  } catch (error) {
    // console.log(error);
    res.status(500).send({ success: false, message: error });
  }
};

module.exports = verifyToken;
