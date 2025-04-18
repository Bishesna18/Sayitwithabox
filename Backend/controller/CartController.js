import User from "../models/User.js"
const addToCart=async(req,res)=>{
   try {
    console.log("userId in addToCart:", req.userId);  
    const { itemId}=req.body
    const userId = req.userId;
    console.log(userId)
    const userData=await User.findById(userId)
    let cartData=await userData.cartData||{};
    if(cartData[itemId]){
       
            cartData[itemId]+=1
        }
        else{
            cartData[itemId]=1
        }
        console.log("After adding to cartData:", cartData);  
    await User.findByIdAndUpdate(userId,{cartData})
    res.json({success:true,message:"added to cart"})
   } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
   }
}
const updateCart=async(req,res)=>{
   try{
     const{itemId,newQuantity}=req.body
     const userId = req.userId;
     const userData=await User.findById(userId)
     let cartData=await userData.cartData;

     cartData[itemId]=newQuantity

     await User.findByIdAndUpdate(userId,{cartData})
    res.json({success:true,message:" cart updated "})
   }catch(error){
    console.log(error)
    res.json({success:false,message:error,message})
   } 
}
const getUserCart=async(req,res)=>{
    try{
        const userId=req.userId;
        const userData=await User.findById(userId)
        let cartData=await userData.cartData ||{};
        res.json({success:true,cartData})
    }
    catch(error){
        console.log(error)
    res.json({success:false,message:error.message})
    }
}
export {addToCart,updateCart,getUserCart}