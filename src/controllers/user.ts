import { Request, Response,NextFunction } from 'express';
import User from '../models/user'

export const  createUser = (req:Request, res:Response, next:NextFunction):void=>{







}

export const getUser = async (req: Request, res: Response,next: NextFunction):Promise<any> => {
    try {
      const user = await User.findById(req.params.userId);
      
      const data: ApiResponse = {
        isSuccessful: !!user,
        displayMessage: user ? null : "User not found",
        exception: user ? null : "User not found",
        timestamp: new Date(),
        data: user ? user:null,
      };
      
      res.status(user?200:404).json(data);
    } catch (error) {
     next(error);
    }
  };

export const getUsers = async (req: Request, res: Response,next: NextFunction):Promise<any> =>{

  
    
    try{
      let users
      if(!req.query.q){
         users = await User.find();
      }else{
        const query =  req.query.q;
        users = await User.find({
          $or: [
              { lastName: { $regex: query} },
              { firstName: { $regex: query} },
              { email: { $regex: query} }
          ]
      })


      }


    
      if(Array.isArray(users) && users.length === 0)users = null;
      const data: ApiResponse = {
        isSuccessful: !!users,
        displayMessage: users ? null : "Users not found",
        exception: users ? null : "Users not found",
        timestamp: new Date(),
        data: users ? users:null,
      };
      return res.status(users?200:404).json(data);
      

    } catch(error) {
    return next(error);
    }




  

}