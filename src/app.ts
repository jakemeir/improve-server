import express, { Request, Response } from 'express';
import SwaggerUI from 'swagger-ui-express';
import dotenv from 'dotenv';
import sequelize from './util/database';

const swagger  = require('../swagger.json')

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/swagger', SwaggerUI.serve, SwaggerUI.setup(swagger));

app.get('/users', (req: Request, res: Response) => {
    const data : ApiResponse   = {
        isSuccessful:true,
        displayMessage:null,
        description:null,
        exception:null,
        timestamp:null,
        data:{}
        
    }
  res.json(data);
});


  sequelize.authenticate().then(()=> console.log('Connection has been established successfully.')).catch(e=>console.log(e)
  )
  


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

