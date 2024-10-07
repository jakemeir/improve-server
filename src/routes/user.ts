import express from "express";
import {createUser,updateUser, getUser,getUsers,deleteUser} from "../controllers/user"
import userValidator from "../middleware/user";

const router = express.Router();

router.post('/users', userValidator,createUser)

router.get('/users',getUsers)

router.put('/users/:userId', userValidator,updateUser)

router.get('/users/:userId',getUser)

router.delete('/users/:userId',deleteUser)

export default router;