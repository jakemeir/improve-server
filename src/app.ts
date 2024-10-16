import express, { Request, Response,NextFunction  } from 'express';
import SwaggerUI from 'swagger-ui-express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user'
import authRoutes from './routes/auth'
import exerciseRoutes from './routes/exercise';
import recipeRoutes from './routes/recipe';
import swagger from '../swagger.json'
import cors from 'cors';
import path from 'path';
import multer, { FileFilterCallback } from "multer"
import guard from './middleware/auth'

dotenv.config();



const port = process.env.PORT as string || 8080;
const app = express();
const fileStorage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,"images")
  },
  filename: (req,file,cb) =>{
    cb(null,new Date().toISOString()+'-'+file.originalname)
  }
});

const fileFilter = (req:Request,file:Express.Multer.File,cb:FileFilterCallback) => {
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
    cb(null,true);
  }else{
    cb(null,false);
  }
};

app.use(cors());

app.use(express.json());
app.post('/exercises',guard,multer({storage:fileStorage,fileFilter:fileFilter}).single('image'))
app.use("/images",express.static(path.join(__dirname,"images")))
app.use('/swagger', SwaggerUI.serve, SwaggerUI.setup(swagger));
app.use("/auth",authRoutes)
app.use("/users",userRoutes);
app.use('/exercises',exerciseRoutes)
app.use('/recipe',recipeRoutes);
 


app.use((error:CustomError,req:Request,res:Response,next:NextFunction)=>{
  console.log(error);
  
  const data: ApiResponse = {
    isSuccessful: false,
    displayMessage:  error.message,
    exception: error.name,
    timestamp: new Date(),
    data: null
  };

  const statusCode = error.statusCode || 500;

  res.status(statusCode).json(data)

})


mongoose
  .connect(process.env.DB_URL as string)
  .then(() => {
   console.log('Connected to DB');
    
   app.listen(port);
   console.log(port);
   
  })
  .catch((e) => console.log(e));

