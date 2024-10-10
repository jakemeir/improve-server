import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response,NextFunction } from 'express';

dotenv.config();

export default async (req:Request, res:Response, next:NextFunction)=>{
    
    // return next()

    const token = req.get('Authorization') || '';
    let decodedToken;
    try {

        decodedToken = jwt.verify(token,process.env.PRIVATE_KEY) as jwt.JwtPayload;

        
    } catch (error) {
        return next(error);
    }
    if(!decodedToken){
        const error:CustomError = new Error("user not authenticated")
        error.statusCode = 401
        return next(error);
    }

    req.body.userId = decodedToken.userId;

   next();
}