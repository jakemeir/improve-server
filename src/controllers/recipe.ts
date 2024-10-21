import { Request, Response,NextFunction } from 'express';
import { validationResult } from 'express-validator';
import Recipe from '../models/recipe';
import fs from "fs";

export const createRecipe = async (req:Request, res:Response, next:NextFunction)=>{
  
  let imgPath ='';

    try {
    
    const { name, description, ingredients, instruction } = req.body;

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

    const newRecipe = new Recipe({
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
      if(imgPath){
        fs.unlinkSync(imgPath)
      }
        next(error);
    }
};


export const deleteRecipe= async (req: Request, res: Response,next: NextFunction)=> {
  try{
   const response  = await Recipe.findByIdAndDelete(req.params.recipeId);

   if(!response){
    const error:CustomError = new Error("recipe not found")
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
  
    res.status(200).json(data);

    if(response.imgPath){
      fs.unlinkSync(response.imgPath)
      
    }


  }catch(error) {
    next(error);
   }


}

export const exportRecipe = async (req: Request, res: Response, next: NextFunction) => {

  const escapeCsvValue = (value: string) => {
    if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  };

  try {
    res.setHeader('Content-Disposition', 'attachment; filename="recipe-list.csv"');
    res.setHeader('Content-Type', 'text/csv');
    res.write('name,description,ingredients,instruction\n');

    const cursor = Recipe.find().cursor();


    cursor.on('data', (recipe) => {
      const ingredients = recipe.ingredients.join(';');
      const csvRow = `${escapeCsvValue(recipe.name)},${escapeCsvValue(ingredients)},${escapeCsvValue(recipe.instruction)}\n`;
      res.write(csvRow);
    });

    cursor.on('end', () => {
      res.end();
    });

    cursor.on('error', (err) => {
      if (!res.headersSent) {
        next(err);
      } else {
        console.error('Error during CSV streaming:', err);
        res.end();
      }
    });

  } catch (error) {
    next(error);
  }
};