const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose
      .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("connected to DB"))
      .catch((error) => console.log(error));
  } catch (error) {
    console.log({ error: error });
  }
};

module.exports = connectDB;
