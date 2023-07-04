const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Product = require("../models/Product");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Configure Multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "product-images",
    allowedFormats: ["jpg", "jpeg", "png"],
  },
});
const upload = multer({ storage });

// API  for creating a new product
router.post("/add-products", upload.array("images", 5), async (req, res) => {
  try {
    // Retrieve the product data from the request body
    const { title, description, price, rating, category, discount, size } =
      req.body;

    // Create a new product object
    const product = new Product({
      title,
      description,
      price,
      rating,
      category,
      discount,
      size,
      images: req.files.map((file) => file.path), // Storing the image URLs in the database
    });

    // Save the product to the database
    await product.save();

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// api for getting all prodcuts
router.get("/get-products", async (req, res) => {
  try {
    const products = await Product.find();
    if (products) {
      res.status(200).send(products);
    }
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "cannot fetch products", error });
  }
});

// api for getting single prodcut
router.get("/get-single-product", async (req, res) => {
  try {
    const id  = req.params.id;
    console.log(id);
    const product = await Product.findById(id)
    if (product) {
      res.status(200).send(product);
    }
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "cannot fetch products", error });
  }
});

// api for getting prodcuts category-wise
router.get("/get-products-by-category", async (req, res) => {
  try {
    const { category } = req.query;
    let filteredProducts;
    if (category === "all") {
      filteredProducts = await Product.find();
    } else {
      filteredProducts = await Product.find({ category });
    }
    res.status(200).send(filteredProducts);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "cannot fetch products", error });
  }
});

module.exports = router;
