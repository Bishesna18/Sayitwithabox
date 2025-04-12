import User from "../models/User.js"
const addToCart=async(req,res)=>{
   try {
    const {userId, itemId,size}=req.body
    const userData=await User.findById(userId)
    let cartData=await userData.cartData;
    if(cartData[itemId]){
        if(cartData[itemId][size]){
            cartData[itemId][size]+=1
        }
        else{
            cartData[itemId][size]=1
        }
    }else{
        cartData[itemId]={}
        cartData[itemId][size]=1
    }
    await User.findByIdAndUpdate(userId,{cartData})
    res.json({success:true,message:"added to cart"})
   } catch (error) {
    console.log(error)
    res.json({success:false,message:error,message})
   }
}
const updateCart=async(req,res)=>{
   try{
     const{userId,itemId,size,quantity}=req.body
     const userData=await User.findById(userId)
     let cartData=await userData.cartData;

     cartData[itemId][size]=quantity

     await User.findByIdAndUpdate(userId,{cartData})
    res.json({success:true,message:" cart updated "})
   }catch(error){
    console.log(error)
    res.json({success:false,message:error,message})
   } 
}
const getUserCart=async(req,res)=>{
    try{
        const{userId}=req.body
        const userData=await User.findById(userId)
        let cartData=await User.cartData;
        res.json({success:true,cartData})
    }
    catch{
        console.log(error)
    res.json({success:false,message:error,message})
    }
}
export {addToCart,updateCart,getUserCart}