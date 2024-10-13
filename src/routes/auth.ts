import express from "express";
import { login,googleLogin, googleCallback ,loginOTP,OTPVerification } from "../controllers/auth";

const router = express.Router();


router.post('/login',login)

router.get("/google",googleLogin)

router.get('/google/callback',googleCallback)

router.post('/login/otp',loginOTP)

router.post('/login/otp/v',OTPVerification)

export default router;