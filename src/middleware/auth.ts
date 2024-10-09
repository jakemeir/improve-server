import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response,NextFunction } from 'express';

dotenv.config();

export default async (req:Request, res:Response, next:NextFunction)=>{

    if(req.method === "POST" && (req.path === "/login" || req.path === '/users')){
       return next();
    }


    const token = req.get('Authorization') || '';
    let decodedToken;
    try {

        decodedToken = jwt.verify(token,process.env.PRIVATE_KEY);

        
    } catch (error) {
        return next(error);
    }
    if(!decodedToken){
        const error:CustomError = new Error("user not authenticated")
        error.statusCode = 401
        return next(error);
    }

   next();
}