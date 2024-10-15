import { Request, Response,NextFunction } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user'
import dotenv from 'dotenv';
import crypto from 'crypto';
import nodemailer from 'nodemailer'


dotenv.config();


export const login = async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const{email,password} = req.body;
        const user = await User.findOne({email:email})
        if(!user){
            const error:CustomError = new Error("wrong email or password")
            error.statusCode = 401;
            throw error;
        }
        const isEqual = await bcrypt.compare(password,user.password)
        if(!isEqual){
            const error:CustomError = new Error("wrong email or password")
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({email:user.email,id:user._id.toString()},
        process.env.PRIVATE_KEY as string,
        {expiresIn:"1h"}
        )

        const data: ApiResponse = {
            isSuccessful: true,
            displayMessage: null,
            exception: null,
            timestamp: new Date(),
            data: {token:token,userId:user._id.toString()},
          };
      
          res.status(200).json(data);




    } catch (error) {
        next(error)
    }

 

}


export const googleLogin = async (req:Request, res:Response, next:NextFunction)=>{
    res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(process.env.GOOGLE_CLIENT_ID as string)}&redirect_uri=http://localhost:8080/auth/google/callback&response_type=code&scope=${encodeURIComponent('profile email')}`);
}

export const googleCallback = async (req:Request, res:Response, next:NextFunction)=>{
    const { code } = req.query;

    try {

        const { data } = await axios.post('https://oauth2.googleapis.com/token', {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            code,
            redirect_uri: 'http://localhost:8080/auth/google/callback',
            grant_type: 'authorization_code',
          });

          const { access_token, id_token } = data;

          const {  data : {email}} = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
            headers: { Authorization: `Bearer ${access_token}` },
          });

          

          const user = await User.findOne({email:email})

          if(!user){
            return res.redirect("http://localhost:3000/signup")
          }

         const token = jwt.sign({email:user.email,id:user._id.toString()},
         process.env.PRIVATE_KEY as string,
         {expiresIn:"1h"}
         )

        res.cookie('token', token,);
      
        res.redirect("http://localhost:3000/users")



    } catch (error) {
        console.log(error);
        next(error)
        
    }

}


export const loginOTP = async (req:Request, res:Response, next:NextFunction)=>{
    const {email} = req.body

    try {
        const user = await User.findOne({email:email})
        if(!user){
            const error:CustomError = new Error("user not found")
            error.statusCode = 404;
            throw error;
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL as string,
              pass: process.env.EMAIL_PASSWORD as string
            }
          });

          const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otp}`
          };
        
         
        await transporter.sendMail(mailOptions);
            
         


        

        const hashedOtp =  crypto.createHash('sha256').update(otp).digest('hex');

        const token = jwt.sign({email:user.email,otp:hashedOtp},
         process.env.PRIVATE_KEY as string,
         {expiresIn:"5m"}
         )



         const data: ApiResponse = {
            isSuccessful: true,
            displayMessage: null,
            exception: null,
            timestamp: new Date(),
            data: {token:token},
          };
      
          res.status(200).json(data);

        
    } catch (error) {
        console.log(error);
        
        next(error)
    }
}


export const OTPVerification = async (req:Request, res:Response, next:NextFunction)=>{
    const { token, otp } = req.body;

    try {
      const decoded = jwt.verify(token, process.env.PRIVATE_KEY as string) as jwt.JwtPayload;
      
      if (!decoded || !decoded.email || !decoded.otp) {
        const error:CustomError = new Error("Invalid token");
        error.statusCode = 400;
        throw error;
      }
  
      const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

      const user = await User.findOne({ email: decoded.email });
      if (!user) {
        const error: any = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }
  
      if (hashedOtp !== decoded.otp) {
        const error: any = new Error("Invalid OTP");
        error.statusCode = 401;
        throw error;
      }
      const newToken = jwt.sign({email:user.email,id:user._id.toString()},
      process.env.PRIVATE_KEY as string,
      {expiresIn:"1h"}
      )

      const data: ApiResponse = {
          isSuccessful: true,
          displayMessage: null,
          exception: null,
          timestamp: new Date(),
          data: {token:newToken,userId:user._id.toString()},
        };
    
        res.status(200).json(data);
      
    } catch (error) {
        next(error);
    }  


    
}