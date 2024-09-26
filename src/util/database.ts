import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();




 const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER_NAME, process.env.DB_PASSWORD, {
    dialect: "mysql",
    host: 'localhost'
    
  });

  export default sequelize;