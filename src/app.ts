import express, { Request, Response } from 'express';
import { ApiResponse } from './util/types';
import SwaggerUI from 'swagger-ui-express';


const swagger  = require('../swagger.json')








const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/swagger', SwaggerUI.serve, SwaggerUI.setup(swagger));




app.get('/', (req: Request, res: Response) => {
    const data : ApiResponse = {
        isSuccessful:true,
        displayMessage:null,
        description:null,
        exception:null,
        timestamp:null,
        data:{}
        
    }
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

