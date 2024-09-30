import express, { Request, Response } from 'express';
import SwaggerUI from 'swagger-ui-express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/user';
import userRoutes from './routes/user'

const swagger  = require('../swagger.json')

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/swagger', SwaggerUI.serve, SwaggerUI.setup(swagger));



app.use(userRoutes);





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

