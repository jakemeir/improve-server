import express from "express";
import guard from '../middleware/auth'
import {createExercise} from "../controllers/exercise"
import exerciseValidator from "../middleware/exercise";
import multer from "multer"
import {fileStorage,fileFilter } from '../util/multer'




const router = express.Router();
router.post('/',guard,multer({storage:fileStorage,fileFilter}).single('image'))
//exerciseValidator ,
router.post("/",guard,createExercise)


export default router;