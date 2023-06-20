const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Product = require('../models/Product');
// const { isLoggedIn } = require('../middlewares/authMiddleWare');
const dotenv = require('dotenv');
dotenv.config()

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET 
});

// Configure Multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'product-images',
    allowedFormats: ['jpg', 'jpeg', 'png']
  }
});
const upload = multer({ storage });



const router = express.Router();


// API endpoint for creating a new product
router.post('/add-products', upload.array('images', 5), async (req, res) => {
  try {
    // Retrieve the product data from the request body
    const { title, description, price, rating, discount, delivery, size } = req.body;

    // Create a new product object
    const product = new Product({
      title,
      description,
      price,
      rating,
      discount,
      delivery,
      size,
      images: req.files.map((file) => file.path) // Store the image URLs in the database
    });

    // Save the product to the database
    await product.save();

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// uploading prodcuct details and pictures
// router.post("/add-products", async (req, res) => {
//     const { name, description, price, rating, images ,category, discount, size, deliveryFee  } = req.body;
//     try {
//       const product = new Product(req.body);
//       await product.save();
//     res
//       .status(201)
//       .send({ success: true, message: "product created successfully"});
//     } catch (error) {
//       res
//       .status(400)
//       .send({ success: false, message: "product cannot be created"});
//     }
//   });
  
//   // sending all products api
//   router.get("/get-products",async(req,res)=>{
//       let prodcuts = await Product.find();
//       try {
//         if(prodcuts.length>0){
//           res
//           .status(200)
//           .send({ success: true, message: "products sent successfully", prodcuts});
//       }}catch (error) {
//         res.status(400).send({
//           success: false,
//           message: "Sorry! No prodcuts available",
//           error
//         })
//       }
//   })


// // // upload images to from cloudinary to prodcut in db

// // // multer storage
// // const storage = multer.diskStorage({
// //   filename: function(req,file,callback){
// //     callback(null,Date.now()+file.originalname)
// //   }
// // })


// //api
// router.post("/upload-image",multer({storage:storage}).single('file'),async(req,res)=>{
//   try {
//     const image = await cloudinary.uploader.upload(req.file.path,{
//       folder: 'testProducts'
//     })
//     await Product.findByIdAndUpdate(req.body.prodcuctId,{
//       $push:{
//         images:image.secure_url
//       }
//     })
//     res.send({
//       success:true,
//       message:"image added successfully",
//       image
//     })
//   } catch (error) {
//     res.send({
//       success:false,
//       message:"image not uploaded",
//       error:error
//     })
//   }
// })








module.exports = router;