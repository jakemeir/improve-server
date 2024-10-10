import { Request, Response,NextFunction } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user'
import dotenv from 'dotenv';

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
        process.env.PRIVATE_KEY,
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
    res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(process.env.GOOGLE_CLIENT_ID)}&redirect_uri=http://localhost:8080/auth/google/callback&response_type=code&scope=${encodeURIComponent('profile email')}`);
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
         process.env.PRIVATE_KEY,
         {expiresIn:"1h"}
         )

        res.cookie('jwt', token,);
      
        res.redirect("http://localhost:3000")



    } catch (error) {
        console.log(error);
        next(error)
        
    }

}


