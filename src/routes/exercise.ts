import express from "express";
import guard from '../middleware/auth'
import {createExercise} from "../controllers/exercise"


const router = express.Router();

router.post("/",guard ,createExercise)


export default router;