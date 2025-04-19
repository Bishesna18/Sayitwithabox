import orderModel from '../models/orderModel.js';
import User from '../models/User.js';
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
export {placeOrder,placeOrderStripe,allOrder,userOrders,updateStatus}