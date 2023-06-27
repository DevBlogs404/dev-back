const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/connection");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const verifyToken = require("./middlewares/authMiddleWare");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`app running at ${PORT}`);
// });
