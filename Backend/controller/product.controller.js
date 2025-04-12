import {v2 as cloudinary} from 'cloudinary'
import Product from '../models/productModel.js'
import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
const addProduct=async(req,res)=>{
   try {
   const{name,category, description,tags, personalization_options, occasion, new_price, old_price, available, rating, sold_count, delivery_time}=req.body
   const image1=req.files.image1 && req.files.image1[0]
   const image2=req.files.image2 && req.files.image2[0]
   const image3=req.files.image3 && req.files.image3[0]
   const image4=req.files.image4 && req.files.image4[0]
   const images=[image1,image2,image3,image4].filter((item)=>item!==undefined)
   let imagesUrl=await Promise.all(
      images.map(async(item)=>{
         let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'});
         return result.secure_url
      })
   )
   const finalCategory = typeof category === 'string' ? category.split(',') : category; 
   console.log("Processed Category:", finalCategory);
const products = await Product.find(); // Find all products to get the last product's id
let id;
if (products.length > 0) {
  let last_product = products[products.length - 1]; // Get the last product
  id = last_product.id + 1; // Increment the id of the last product
} else {
  id = 1; // If no products exist, start with id 1
}
id = parseInt(id);
  const productData={
   id:id,
   name,
   description,
   category:finalCategory, 
   new_price,
   old_price,
   tags:Array.isArray(tags) ? tags : [tags],
   image:imagesUrl,
   date:Date.now(),
   available:available !== undefined ? (available.toLowerCase() === "true" ) : true, 
   rating:parseFloat(rating)||0, 
   sold_count:parseInt(sold_count)||0,
   delivery_time,
   personalization_options,
  occasion
  }
 console.log(productData)
 const product= new Product(productData)
 await product.save()
   res.json({success:true,message:"Product Added"})
   } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
   }

}
const listProduct=async(req,res)=>{
    try {
      const products=await Product.find({});
      res.json({success:true,products})
    } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
    }
}
const removeProduct=async(req,res)=>{
    try {
       await Product.findByIdAndDelete(req.body.id)
       res.json({success:true,message:"Product removed"})
    } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
    }
}
const singleProduct=async(req,res)=>{
    try {
      const {productId}=req.body
      const product=await Product.findById(productId)
      res.json({success:true,product})

      
    } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
    }
}
export{listProduct,removeProduct,singleProduct,addProduct}