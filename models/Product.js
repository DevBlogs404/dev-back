const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    // category:{ type:String, required:true },
    images: { type:[String], required:true},
    discount:{type: Number, required:true},
    size:{type:String, required:true},
    delivery:{type:String, required:true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", ProductSchema);

