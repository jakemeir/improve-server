import { Request, Response,NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user'
import dotenv from 'dotenv';

dotenv.config();


export const login = async (req:Request, res:Response, next:NextFunction)=>{

    console.log(req);
    


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