import express from "express";
import {createUser, getUser,getUsers} from "../controllers/user"

const router = express.Router();

router.post('/users',createUser)

router.get('/users',getUsers)

router.get('/users/:userId',getUser)




export default router;