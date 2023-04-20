// const mongoose = require("mongoose")
import mongoose from "mongoose"
const connectDB= async()=>{
    try {
        const conn = await mongoose.connect(process.env.DB_URL)
        console.log("connected to DB");
    } catch (error) {
        console.log({"error":error});
    }
}
export default connectDB;