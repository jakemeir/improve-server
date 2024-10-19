import { Request, Response,NextFunction } from 'express';
import Exercise from '../models/exercise';
import { validationResult } from 'express-validator';
import fs from "fs"

export const  createExercise= async (req:Request, res:Response, next:NextFunction)=>{
    let imgPath =''
    
    try {
        const { name, description, sets,times,category} = req.body;
    
        const result = validationResult(req);

        if(!req.file){
            const error:CustomError = new Error('no image provided');
            error.statusCode = 422;
            throw error;
        }

        imgPath =  req.file.path;
    
        if (!result.isEmpty()) {
          const error:CustomError = new Error(result.array()[0].msg);
          error.statusCode = 422;
          throw error;
        }

    
    
        const newExercise = new Exercise({
          name,
          description,
          sets,
          times,
          category,
          imgPath
        });
    
        await newExercise.save();
    
        const data: ApiResponse = {
          isSuccessful: true,
          displayMessage: null,
          exception: null,
          timestamp: new Date(),
          data: newExercise,
        };
    
        res.status(201).json(data);
    
      } catch (error) {
        if(imgPath){
            fs.unlinkSync(imgPath)
        }
        
        next(error);
        
      }
}


export const updateExercise = async (req: Request, res: Response, next: NextFunction)=>{
  
let imgPath = req.file?.path;

  try {
    const { name, description, sets,times,category,status} = req.body;

    const result = validationResult(req);
  
    if (!result.isEmpty()) {
      const error:CustomError = new Error(result.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const updatedExercise = {
      name,
      description,
      sets,
      times,
      category,
      status,
      ...(req.file && { imgPath: req.file.path }) 
    };

    const response =  await Exercise.findByIdAndUpdate(req.params.exerciseId,updatedExercise);

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

    if(imgPath){
      fs.unlinkSync(response.imgPath)
      
    }

    } catch (error) {
    if(imgPath){
      fs.unlinkSync(imgPath)
    }
    next(error);
    
  }

}


export const getExercises = async (req: Request, res: Response,next: NextFunction)=>{
  try{
    let exercises = null;
    const query =  req.query.q?.toString().trim();
    if(!query){
       exercises = await Exercise.find();
    }else{
      exercises = await Exercise.find({
        $or: [
            { name: { $regex: query} },
            { description: { $regex: query} }
        ]
    })
    }

    if(exercises.length === 0)exercises = null;

    if(!exercises){
      const error:CustomError = new Error("exercises not found")
      error.statusCode = 404
      throw error;
    }
    const data: ApiResponse = {
      isSuccessful: true,
      displayMessage: null,
      exception: null,
      timestamp: new Date(),
      data: exercises
    };
    res.status(200).json(data);
    

  } catch(error) {
    next(error);
  }
}