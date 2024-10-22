import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

export default (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        const error = new Error('Authorization header missing') as CustomError;
        error.statusCode = 401;
        return next(error);
    }

    const token = authHeader
    
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.PRIVATE_KEY as string) as jwt.JwtPayload;
    } catch (error) {
        const authError = error as CustomError;
        authError.statusCode = 401;
        return next(authError);
    }

    if (!decodedToken) {
        const error = new Error('User not authenticated') as CustomError;
        error.statusCode = 401;
        return next(error);
    }

    req.body.userId = decodedToken.id;
    next();
};