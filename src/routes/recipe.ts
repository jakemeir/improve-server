import express from "express";
import guard from '../middleware/auth';
import {createRecipe,deleteRecipe,exportRecipe} from '../controllers/recipe'
import recipeValidator from '../middleware/recipe';



const router = express.Router();

router.post('/', guard, recipeValidator, createRecipe);


router.delete('/:recipeId',guard,deleteRecipe)

router.get('/export',guard,exportRecipe)


export default router;
