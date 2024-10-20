import express from "express";
import guard from '../middleware/auth';
import {createRecipe,deleteRecipe} from '../controllers/recipe'
import recipeValidator from '../middleware/recipe';



const router = express.Router();

router.post('/', guard, recipeValidator, createRecipe);


router.delete('/:recipeId',guard,deleteRecipe)


export default router;
