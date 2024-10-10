import express from "express";
import {createUser,updateUser, getUser,getUsers,deleteUser,exportUser} from "../controllers/user"
import userValidator from "../middleware/user";

const router = express.Router();

router.post('/', userValidator,createUser)

router.get('/',getUsers)

router.get('/export', exportUser)

router.put('/:userId', userValidator,updateUser)

router.get('/:userId',getUser)

router.delete('/:userId',deleteUser)



export default router;