import path from 'path';
import multer, { FileFilterCallback } from "multer"
import express, { Request, Response,NextFunction  } from 'express';

export const fileStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
      cb(null,"images")
    },
    filename: (req,file,cb) =>{
      const timestamp = new Date().toISOString().replace(/:/g, '-');
      cb(null, timestamp + '-' + file.originalname);
    }
  });
  
 export const fileFilter = (req:Request,file:Express.Multer.File,cb:FileFilterCallback) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
      cb(null,true);
    }else{
      cb(null,false);
    }
  };

