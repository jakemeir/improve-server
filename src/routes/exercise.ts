import express from "express";
import guard from '../middleware/auth'
import {createExercise} from "../controllers/exercise"
import exerciseValidator from "../middleware/exercise";


const router = express.Router();
//exerciseValidator ,
router.post("/",guard,createExercise)


export default router;