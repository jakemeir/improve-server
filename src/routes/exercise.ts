import express from "express";
import guard from '../middleware/auth'
import {createExercise,getExercises,updateExercise,deleteExercise,exportExercise,getExercise} from "../controllers/exercise"
import exerciseValidator from "../middleware/exercise";
import multer from "multer"
import {fileStorage,fileFilter } from '../util/multer'




const router = express.Router();
router.get('/export',guard,exportExercise)
router.use('/',guard,multer({storage:fileStorage,fileFilter}).single('image'))
router.post("/",guard,exerciseValidator,createExercise)
router.get('/:exerciseId', guard,getExercise)
router.get('/',guard,getExercises)
router.put('/:exerciseId',guard,exerciseValidator ,updateExercise)
router.delete('/:exerciseId',guard,deleteExercise)



export default router;