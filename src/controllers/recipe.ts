import { Request, Response,NextFunction } from 'express';
import { validationResult } from 'express-validator';
import recipe from '../models/recipe';

export const createRecipe = async (req:Request, res:Response, next:NextFunction)=>{
    try {
    
    const { name, description, imgPath, ingredients, instruction } = req.body;

    const result = validationResult(req);

    if (!result.isEmpty()) {
      const error:CustomError = new Error(result.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const newRecipe = new recipe({
        name,
        description,
        imgPath,
        ingredients,
        instruction,
    });

    await newRecipe.save();

    const data: ApiResponse = {
        isSuccessful: true,
        displayMessage: null,
        exception: null,
        timestamp: new Date(),
        data: newRecipe,
      };
  
      res.status(201).json(data);
    
    } catch (error) {
        next(error);
    }
};
