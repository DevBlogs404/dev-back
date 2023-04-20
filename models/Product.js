import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    photo: { data: Buffer, contentType: String},
  },
  { timestamps: true }
);

export default mongoose.model("product", ProductSchema);
