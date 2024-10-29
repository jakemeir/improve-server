import express from "express";
import guard from '../middleware/auth';
import {createRecipe,deleteRecipe,exportRecipe,getRecipes,UpdateRecipe} from '../controllers/recipe'
import recipeValidator from '../middleware/recipe';
import multer from "multer";
import { fileStorage, fileFilter } from '../util/multer';
 



const router = express.Router();
router.use('/', guard, multer({ storage: fileStorage, fileFilter }).single('image'));
router.post('/', guard, recipeValidator, createRecipe);
router.put('/', guard, recipeValidator, UpdateRecipe);
router.get('/',guard,getRecipes)
router.delete('/:recipeId',guard,deleteRecipe)
router.get('/export',guard,exportRecipe)


export default router;
