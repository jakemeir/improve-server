import express from "express";
import guard from '../middleware/auth';
import {createRecipe} from '../controllers/recipe'
import recipeValidator from '../middleware/recipe';



const router = express.Router();

router.post('/', guard, recipeValidator, createRecipe);


export default router;
