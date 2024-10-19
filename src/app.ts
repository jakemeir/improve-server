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
import guard from './middleware/auth'

dotenv.config();
const port = process.env.PORT as string || 8080;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/images",guard,express.static(path.join(__dirname,"images")))
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

