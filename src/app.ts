import express, { Request, Response,NextFunction  } from 'express';
import SwaggerUI from 'swagger-ui-express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user'
import swagger from '../swagger.json'

const port = process.env.PORT || 3000;
dotenv.config();
const app = express();

app.use(express.json());
app.use('/swagger', SwaggerUI.serve, SwaggerUI.setup(swagger));
app.use(userRoutes);


app.use((error:CustomError,req:Request,res:Response,next:NextFunction)=>{
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
  .connect(process.env.DB_URL)
  .then(() => {
   console.log('Connected to DB');
    
   app.listen(port);
   console.log(port);
   
  })
  .catch((e) => console.log(e));

