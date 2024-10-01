import express from "express";
import {createUser, getUser,getUsers,deleteUser} from "../controllers/user"

const router = express.Router();

router.post('/users',createUser)

router.get('/users',getUsers)

router.get('/users/:userId',getUser)


router.delete('/users/:userId',deleteUser)



export default router;