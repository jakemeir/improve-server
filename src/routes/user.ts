import express from "express";
import {createUser,updateUser, getUser,getUsers,deleteUser,exportUser} from "../controllers/user"
import userValidator from "../middleware/user";
import guard from '../middleware/auth'

const router = express.Router();

router.post('/', guard, userValidator,createUser)

router.get('/',guard,getUsers)

router.get('/export',guard, exportUser)

router.put('/:userId',guard, userValidator,updateUser)

router.get('/:userId', guard,getUser)

router.delete('/:userId',guard,deleteUser)



export default router;