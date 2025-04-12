import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
        name:{
            type:String,
            required:true,
            },
            email:{
              type:String,
              required:true,
              unique:true,
            },
            password:{
                type:String,
                required:true,
            },
            cartData:{
             type:Object,
             default: {} 
            },
            Date:{
                type:Date,
                default:Date.now,
            },
            isverified:{
               type:Boolean,
               default:false
            },
            resetPasswordToken:String,
            resetPasswordExpiresAt:Date,
            verificationToken:String,
            verificationTokenExpiresAt:Date,
},{timestamps:true});
const User=mongoose.model("User",userSchema);
export default User;