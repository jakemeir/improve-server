import express from "express";
import guard from '../middleware/auth'
import {createExercise,getExercises,updateExercise} from "../controllers/exercise"
import exerciseValidator from "../middleware/exercise";
import multer from "multer"
import {fileStorage,fileFilter } from '../util/multer'




const router = express.Router();
router.use('/',guard,multer({storage:fileStorage,fileFilter}).single('image'))
//exerciseValidator ,
router.post("/",guard,createExercise)
router.get('/',guard,getExercises)
router.put('/:exerciseId',guard,exerciseValidator ,updateExercise)


export default router;