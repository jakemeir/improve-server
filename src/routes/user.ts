import express from "express";
import {createUser, getUser} from "../controllers/user"

const router = express.Router();

router.post('/users',createUser)

router.get('/users:userId',getUser)




export default router;