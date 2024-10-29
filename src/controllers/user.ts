import { Request, Response,NextFunction } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import User from '../models/user'

export const  createUser = async (req:Request, res:Response, next:NextFunction)=>{

  try {
    const { firstName,lastName, phone, email,password,additionalData} = req.body;

    const result = validationResult(req);

    if (!result.isEmpty()) {
      const error:CustomError = new Error(result.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
      additionalData
    });

    await newUser.save();

    const data: ApiResponse = {
      isSuccessful: true,
      displayMessage: null,
      exception: null,
      timestamp: new Date(),
      data: newUser,
    };

    res.status(201).json(data);

  } catch (error) {
    next(error);
    
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction)=>{


  try {
    const { firstName,lastName, phone, email, role} = req.body;

    const result = validationResult(req);
  
    if (!result.isEmpty()) {
      const error:CustomError = new Error(result.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const updatedUser = {
      firstName,
      lastName,
      phone,
      email,
      role
    };

    const response =  await User.findByIdAndUpdate(req.params.userId, updatedUser,{ new: true });

    if(!response){
      const error:CustomError = new Error("user not found")
      error.statusCode = 404
      throw error;
    }

    const data: ApiResponse = {
      isSuccessful: true,
      displayMessage: null,
      exception: null,
      timestamp: new Date(),
      data: response,
    };

    res.status(200).json(data);

    
  } catch (error) {
    next(error);
    
  }

}

export const getUser = async (req: Request, res: Response,next: NextFunction)=> {
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

export const deleteUser= async (req: Request, res: Response,next: NextFunction)=> {
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

export const getUsers = async (req: Request, res: Response,next: NextFunction)=>{
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
      res.status(200).json(data);
      

    } catch(error) {
      next(error);
    }
}

export const exportUser = async (req: Request, res: Response,next: NextFunction)=>{
  res.setHeader('Content-Disposition', 'attachment; filename="user-list.csv"');
  res.setHeader('Content-Type', 'text/csv');
  res.write('firstName,lastName,email,phone,role\n');

  const cursor = User.find().cursor();

  cursor.on('data',(user)=>{
    const csvRow = `${user.firstName},${user.lastName},${user.email},${user.phone},${user.role}\n`;
    res.write(csvRow);
  })

  cursor.on('end', () => {
    res.end();
  });

  cursor.on('error', (err) => {
    next(err)
  });

  
}

