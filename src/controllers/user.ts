import { Request, Response,NextFunction } from 'express';
import User from '../models/user'

export const  createUser = (req:Request, res:Response, next:NextFunction):void=>{







}

export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await User.findById(req.body?.id);
      
      const data: ApiResponse = {
        isSuccessful: !!user,
        displayMessage: user ? null : "User not found",
        exception: user ? null : "User not found",
        timestamp: new Date(),
        data: user ? user:null,
      };
      
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

