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

export const deleteUser= async (req: Request, res: Response,next: NextFunction):Promise<any> => {
  try{
   const response  = await User.findByIdAndDelete(req.params.userId);
   const data: ApiResponse = {
    isSuccessful: !!response,
    displayMessage: response ? null : "User not found",
    exception: response ? null : "User not found",
    timestamp: new Date(),
    data:null,
  };
  
  res.status(response?200:404).json(data);
  }catch(error) {
    next(error);
   }


}



export const getUsers = async (req: Request, res: Response,next: NextFunction):Promise<any> =>{

  
    
    try{
      let users = null;
      const query =  req.query.q?.toString().trim();
      if(query){
         users = await User.find();
      }else{
        users = await User.find({
          $or: [
              { lastName: { $regex: query} },
              { firstName: { $regex: query} },
              { email: { $regex: query} }
          ]
      })
      }

      if(users.length === 0)users = null;
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