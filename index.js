import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import formidMiddleWare from 'express-formidable'
import dotenv from 'dotenv'

import connectDB from './config/connection.js'
import User from './models/User.js'
import Product from './models/Product.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/upload", express.static("./images"));


//routes
app.use('/api/v1/auth', authRoutes)

// uploading prodcuct details and pictures
app.post("/upload", formidMiddleWare(), async (req, res) => {
  const { name, desc, price, rating } = req.fields;
  const { photo } = req.files;

  const product = new Product({ ...req.fields });
  if (photo) {
    (product.photo.data = fs.readFileSync(photo.path)),
      (product.photo.contentType = photo.type);
  }
  await product.save();
  res
    .status(201)
    .send({ success: true, message: "product created successfully", product });
});

app.use("/", (req, res) => {
  res.send("hello there");
});
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`app running at ${PORT}`);
});