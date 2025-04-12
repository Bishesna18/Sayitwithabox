import bcrypt from "bcrypt";
import crypto from "crypto";

import {generateTokenAndSetCookie} from '../utils/generateTokenAndSetCookie.js'
import {sendVerificationEmail} from "../mailtrap/email.js";
import {sendwelcomeEmail,sendPasswordResetEmail,sendResetSuccessEmail} from "../mailtrap/email.js";
import User from '../models/User.js'; 

export const signup=async(req,res)=>{
    const {email,password,name}=req.body;
    try{
     if(!email||!password||!name){
        throw new Error("All fields are required");
     }
     const userAlreadyExists=await User.findOne({email});
     if(userAlreadyExists){
        return res.status(400).json({success:false,message:"User already exists"});
     }
     const hashedPassword=await bcrypt.hash(password,10);
     const verificationToken= Math.floor(10000+Math.random()*900000).toString();
    
     const user=new User({
        email,
        password:hashedPassword,
        name,
        verificationToken,
        verificationTokenExpiresAt:Date.now()+24*60*60*1000,//24 hrs
        cartData:{},
     });
    await user.save();
    //jwt

    generateTokenAndSetCookie(res,user._id);
await sendVerificationEmail(user.email,verificationToken);

    // res.status(201).json({
    //     success:true,
    //     message:"User created successfully",
    //     user:{
    //         ...user._doc,
    //         password:undefined,
    //     },
    // });
    }catch(error){
    res.status(400).json({success:false,message:error.message});
    }
   
};
export const verifyEmail=async(req,res)=>{
    //----- code
    const{code}=req.body;
    try{
        const user=await User.findOne({
            verificationToken:code,
            verificationTokenExpiresAt:{$gt:Date.now()}
        })
        if (!user){
            return res.status(400).json({success:false,message:"Invalid or expired verification code"})
           
        }
        user.isverified=true;
        user.verificationToken=undefined;
        user.verificationTokenExpiresAt=undefined;
        await user.save();

        await sendwelcomeEmail(user.email,user.name);
         res.status(200).json({
            success:true,
            message:"Email verified successfully",
            user:{
                ...user._doc,
                password:undefined,
            },
         });
    }catch(error){
        console.error("Error verifying email:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
   
};
export const login=async(req,res)=>{
    const { email, password } = req.body;
  try {
    // if (!email || !password) {
    //   return res.status(400).json({ success: false, message: "All fields are required" });
    // }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // Check if the user's email is verified
    if (!user.isverified) {
      return res.status(400).json({ success: false, message: "Email not verified. Please verify your email first." });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ success: false, message: "Incorrect password" });
    }

    // Generate a token and set it in the cookie
    generateTokenAndSetCookie(res, user._id);
    user.Date=new Date();
    await user.save();
    // res.status(200).json({
    //   success: true,
    //   message: "Login successful",
    //   user: {
    //     ...user._doc,
    //     password:undefined,
    //   },
    // });
  } catch (error) {
    console.error("Error during login:", error);
   return res.status(500).json({ success: false, message: "Internal server error" });
  }
           
            
    
};
export const forgotPassword=async(req,res)=>{
  const {email}=req.body;
  try {
    const user=await User.findOne({email});

    if(!user){
      return res.status(400).json({success:false,message:"User not found"});
    }
    //generate reset token
    const resetToken=crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt=Date.now()+1*60*60*1000;

    user.resetPasswordToken=resetToken;
    user.resetPasswordExpiresAt=resetTokenExpiresAt;
    await user.save();
  
  await sendPasswordResetEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`);
  res.status(200).json({success:true,message:"Password reset link sent to your email"});
} catch (error) {
    console.log("Error in forgotPassword ",error);
    res.status(400).json({success:false,message:error.message});
  }
}
export const resetPassword=async(req,res)=>{
  try {
    const {token}=req.params;
    const{password}=req.body;
    
    const user=await User.findOne({
      resetPasswordToken:token,
      resetPasswordExpiresAt:{$gt:Date.now()},
    });
    if(!user){
      return res.status(400).json({success:false,message:"Invalid or expired reset token"})
    }
    console.log("User found, updating password.");


    //password update
    const hashedPassword=await bcrypt.hash(password,10);
    user.password=hashedPassword;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpiresAt=undefined;
    await user.save();

   await sendResetSuccessEmail(user.email);
   res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    
    // Error response here
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}


export const logout=async(req,res)=>{

   res.clearCookie("token")
   res.status(200).json({success:true,message:"logged out successfully"});
};
export const adminLogin=async(req,res)=>{
    try {
      const {email,password}=req.body
      if (email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
           const token=generateTokenAndSetCookie(res,email);
           res.json({success:true,token})
      }
      else{
        res.json({success:false,message:"Invalid credentials"})
      }

      
    } catch (error) {
      console.log(error)
      res.json({success:false,message:"Invalid credentials"})
      
    }
}