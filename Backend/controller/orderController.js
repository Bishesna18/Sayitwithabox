import orderModel from '../models/orderModel.js';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();
import Stripe from 'stripe'
const currency='npr'
const deliveryCharge=100
//gatewayinit
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder=async(req,res)=>{
   try {
    const{ items,amount,address}=req.body;
    const userId = req.userId; 
    if (!userId) {
        return res.status(400).json({ success: false, message: "User not authenticated" });
      }
    const orderData={
        userId,
        items,
        amount,
        address:req.body.address,
        paymentMethod:"COD",
        payment:false,
        date:Date.now()

    }
    const newOrder=new orderModel(orderData)
    await newOrder.save()
    await User.findByIdAndUpdate(userId,{cartData:{}})
    res.json({success:true,message:"Order placed"})
   } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
   }
}
const placeOrderStripe=async(req,res)=>{
    try {
       const{ items,amount,address}=req.body;
       const {origin}=req.headers;
       const userId = req.userId; 
       const orderData={
        userId,
        items,
        amount,
        address:req.body.address,
        paymentMethod:"Stripe",
        payment:false,
        date:Date.now()

    }
    const newOrder=new orderModel(orderData)
    await newOrder.save()

    const line_items=items.map((item)=>({
      price_data:{
        currency:currency,
        product_data:{
          name:item.name
        },
        unit_amount:item.new_price*100
      },
      quantity:item.quantity

    })) 
    line_items.push({
      price_data:{
        currency:currency,
        product_data:{
          name:'deliveryCharge'
        },
        unit_amount:deliveryCharge*100
      },
      quantity:1
    })
  const session=await stripe.checkout.sessions.create({
    success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
    line_items,
    mode:'payment',
  })
  res.json({success:true,session_url:session.url})
    } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message}) 
    }
}
//verify
const verifyStripe=async(req,res)=>{
     const {orderId,success}=req.body
      const userId = req.userId; 
     try {
      if(success==="true"){
        await orderModel.findByIdAndUpdate(orderId,{payment:true},{ new: true });
        await User.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true});
      }else{
        await orderModel.findByIdAndDelete(orderId)
        res.json({success:false})
      }
     } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message}) 
     }
}
//all orderdata for admin panel
const allOrder=async(req,res)=>{
    try{
      const orders=await orderModel.find({})
      res.json({success:true,orders})
    }  
    catch(error){
      console.log(error)
      res.json({success:false,message:error.message})
    }
}
//frontend
const userOrders=async(req,res)=>{
   try {
    const userId=req.userId
    const orders=await orderModel.find({userId})
    res.json({success:true,orders})

   } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
   } 
}
//update status
const updateStatus=async(req,res)=>{
   try {
    const{orderId,status}=req.body
    await orderModel.findByIdAndUpdate(orderId,{status},  { new: true } )
    res.json({success:true,message:'status updated'})
   } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
   } 
} 
export {verifyStripe,placeOrder,placeOrderStripe,allOrder,userOrders,updateStatus}