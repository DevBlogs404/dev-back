const bcrypt = require("bcrypt");

const hashPass = async (password) => {
  const saltRounds = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, saltRounds);
  return hashedPass;
};

const comparePass = async (password, hashedPass) => {
  return await bcrypt.compare(password, hashedPass);
};

module.exports = { hashPass, comparePass };
