const port=4000;
import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import cors from "cors";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";
import {connectDB} from './db/connectDB.js';
import authRoutes from "./routes/auth.route.js";
import productRoute from "./routes/productRoute.js";
import connectCloudinary from './config/cloudinary.js';
import cartRouter from './routes/cart.route.js';
const app=express();
app.use(express.json());
app.use(cors({ origin:  ["http://localhost:3000", "http://localhost:5174"]  })); // Specify the frontend URL


//database connection with mdb:
// mongoose.connect("mongodb+srv://sayitwithbox:D1mVrcG74uJAz1Fj@cluster0.7zc0i.mongodb.net/ecommerce")

//ApI creation



app.get("/",(req,res)=>{
    res.send("Express App is Running")
});

app.use('/api/auth',authRoutes)
app.use('/api/product',productRoute)
app.use('/api/cart',cartRouter)
app.listen(port,(error)=>{
    if(!error){
        connectDB();
        connectCloudinary()
      console.log("server running on port"+port); 
    }
    else{
        console.log("Error:"+error);
    }
})
//Image storage engine
// const storage = multer.diskStorage({
//     destination:'./upload/images',
//     filename:(req,file,cb)=>{
//         return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)

//     }
// })


// const upload=multer({storage:storage})
// app.use('/images',express.static('upload/images'))
// app.post("/upload",upload.single('product'),(req,res)=>{
//    res.json({
//     success:1,
//     image_url:`http://localhost:${port}/images/${req.file.filename}`  
//    }) 
// })
// // schema for creating products

// const productSchema = new mongoose.Schema({
//     id: { type: Number, required: true,unique:true },
//     name: { type: String, required: true },
//     image: { type: String, required: true },
//     category: { type: [String], required: true }, // Fixed incorrect data type
//     description: { type: String,  default: "" }, // Added for detailed item descriptions
//     tags: [String], // Added for AI-friendly features like keywords
//     personalization_options: { type: Array, default: [] }, // Added for customization options
//     occasion: { type: String }, // Added to categorize products by events
//     new_price: { type: Number, required: true },
//     old_price: { type: Number },
//     date: { type: Date, default: Date.now },
//     available: { type: Boolean, default: true }, // Fixed typo
//     rating: { type: Number, default: 0 }, // Added for user feedback
//     sold_count: { type: Number, default: 0 }, // Added for tracking popularity
//     delivery_time: { type: String }, // Added for estimated delivery times
// });

// const Product = mongoose.model('Product', productSchema);
// app.post('/addproduct', async (req, res) => {
//     //for auto increment in product id.
//     let products = await Product.find({});
// let id;
// if (products.length > 0) {
//     let last_product = products[products.length - 1]; // Get the last product
//     id = last_product.id + 1; // Increment the id of the last product
// } else {
//     id = 1; // If no products exist, start with id 1
// }
//     try {
        
//         const newProduct = new Product({
//             id:id,
//             name: req.body.name,
//             image: req.body.image,
//             category: req.body.category,
//             description: req.body.description, // New field
//             tags: req.body.tags || [], // New field for keywords
//             personalization_options: req.body.personalization_options || [], // New field
//             occasion: req.body.occasion, // New field
//             new_price: req.body.new_price,
//             old_price: req.body.old_price,
//             available: req.body.available || true,
//             delivery_time: req.body.delivery_time || "3-5 business days", // New field
//         });

//         await newProduct.save();
//         console.log("Product saved:", newProduct);

//         res.json({
//             success: true,
//             product: newProduct
//         });
//     } catch (error) {
//         console.error("Error adding product:", error);
//         res.status(500).json({ success: false, message: "Failed to add product" });
//     }
// });
// //api for deleting product
// app.post('/removeproduct',async(req,res)=>{
//     await Product.findOneAndDelete({id:req.body.id});
//     console.log("Removed");
//     res.json({
//         success:true,
//         name:req.body.name
//     })
// })
// //api for getting all products
// app.get('/allproducts',async(req,res)=>{
//     let products= await Product.find({});
//     console.log('All products Fetched');
//     res.send(products);

// })
// //schema for user model
// const Users=mongoose.model('Users',{
//     name:{
//         type:String,
//     },
//     email:{
//       type:String,
//       unique:true,
//     },
//     password:{
//         type:String,
//     },
//     cartData:{
//      type:Object,
//     },
//     Date:{
//         type:Date,
//         default:Date.now,
//     }
//     })

//     //endpoint for regesting users
//     app.post('/signup',async(req,res)=>{
//     let check=await Users.findOne({email:req.body.email});
//     if(check){
//         return res.status(400).json({success:false,error:'existing user found with same email id'})
//     }
//     let cart={};
//     for (let i=0;i<300;i++){
//         cart[i]=0;
//     }
//     const saltgen=10;
  
//     const hashedPassword = await bcrypt.hash(req.body.password, saltgen);
//     const user=new Users({
//         name:req.body.username,
//         email:req.body.email,
//         password:hashedPassword,
//         cartData:cart,
//     })
//     await user.save();
//     const data={
//         user:{
//             id:user.id 
//         }
//     }
//     const token=jwt.sign(data,'secret-ecom');
//     res.json({success:true,token})
//     })

// //endpoint for login
// app.post('/login',async(req,res)=>{
//     let user=await Users.findOne({email:req.body.email});
//     if (user){
//         const passCompare=await bcrypt.compare(req.body.password, user.password);
//         if(passCompare){
//             const data={
//                 user:{
//                     id:user.id
//                 }
//             }
//             const token=jwt.sign(data,'secret_ecom');
//             res.json({success:true,token});
//         }
//         else{
//             res.json({success:false,errors:"Wrong password"});
//         }
//     }
//     else{
//         res.json({success:false,errors:"wrong email Id"})
//     }
//     })


    