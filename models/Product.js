const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "title is required"] },
    description: { type: String, required: [true, "description is required"] },
    price: { type: Number, required: [true, "price is required"] },
    rating: { type: Number, required: [true, "rating is required"] },
    category: { type: String, required: [true, "category is required"] },
    images: { type: [String], required: [true, "images is required"] },
    discount: { type: Number, required: [true, "discount is required"] },
    size: { type: String, required: [true, "title is required"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", ProductSchema);
