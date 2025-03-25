import express from "express";
import {signup,login,logout,verifyEmail,forgotPassword,resetPassword, adminLogin} from '../controller/auth.controller.js'

const router= express.Router();

router.post("/signup",signup);

router.post("/login",login);
router.post("/logout",logout);
router.post("/verify-email",verifyEmail);
router.post("/forgot-password",forgotPassword);
router.post("/admin",adminLogin);
router.post("/reset-password/:token",resetPassword);
export default router;