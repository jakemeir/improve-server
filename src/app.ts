import express, { Request, Response,NextFunction  } from 'express';
import SwaggerUI from 'swagger-ui-express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/user';
import userRoutes from './routes/user'


const swagger  = require('../swagger.json')

const port = process.env.PORT || 3000;
dotenv.config();
const app = express();

app.use(express.json());
app.use('/swagger', SwaggerUI.serve, SwaggerUI.setup(swagger));
app.use(userRoutes);


app.use((error:Error,req:Request,res:Response,next:NextFunction)=>{
  const data: ApiResponse = {
    isSuccessful: false,
    displayMessage: 'Server error',
    exception: "Internal server error",
    timestamp: new Date(),
    data: null
  };

  res.status(500).json(data)

})


mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    User.findOne().then((u) => {
      if (!u) {
        const user = new User({
          name: "jake",
          email:'jake@test.com'
          
        });
        user.save();
      }
    });

    app.listen(port);
  })
  .catch((e) => console.log(e));

