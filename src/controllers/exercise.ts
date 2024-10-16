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