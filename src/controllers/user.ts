import { Request, Response,NextFunction } from 'express';
import User from '../models/user'

export const  createUser = (req:Request, res:Response, next:NextFunction):void=>{







}

export const getUser = async (req: Request, res: Response,next: NextFunction):Promise<any> => {
    try {
      const user = await User.findById(req.params.userId);

      if(!user){
        const error:CustomError = new Error("user not found")
        error.statusCode = 404
        throw error;
      }
      
      const data: ApiResponse = {
        isSuccessful: true,
        displayMessage:  null,
        exception: null ,
        timestamp: new Date(),
        data: user ,
      };
      
      res.status(200).json(data);
    } catch (error) {
     next(error);
    }
  };

export const deleteUser= async (req: Request, res: Response,next: NextFunction):Promise<any> => {
  try{
   const response  = await User.findByIdAndDelete(req.params.userId);

   if(!response){
    const error:CustomError = new Error("user not found")
    error.statusCode = 404
    throw error;
  }


   const data: ApiResponse = {
    isSuccessful: true,
    displayMessage:  null ,
    exception:  null ,
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
      if(!query){
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

      if(!users){
        const error:CustomError = new Error("users not found")
        error.statusCode = 404
        throw error;
      }
      const data: ApiResponse = {
        isSuccessful: true,
        displayMessage: null,
        exception: null,
        timestamp: new Date(),
        data: users
      };
      return res.status(200).json(data);
      

    } catch(error) {
    return next(error);
    }
}