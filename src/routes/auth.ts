import express from "express";
import { login,googleLogin, googleCallback } from "../controllers/auth";

const router = express.Router();


router.post('/login',login)

router.get("/google",googleLogin)

router.get('/google/callback',googleCallback)

export default router;