
import {createUser, getUser,getUsers} from "../controllers/user"
import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import User from '../models/user';

const router = express.Router();

const userValidator = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required.')
    .isAlpha()
    .withMessage('First name should contain only letters.'),

  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required.')
    .isAlpha()
    .withMessage('Last name should contain only letters.'),

  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required.')
    .isMobilePhone('any')
    .withMessage('Please enter a valid phone number.'),

  body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom(async (value) => {
      const existingUser = await User.findOne({ email: value });
      if (existingUser) {
        throw new Error('E-Mail address already exists!');
      }
    })
    .normalizeEmail(),

  body('role')
    .trim()
    .notEmpty()
    .withMessage('Role is required.')
    .isIn(['admin', 'user'])
    .withMessage('Role must be either admin or user.'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.')
];

router.post('/user', userValidator,);

router.post('/users',createUser)

router.get('/users',getUsers)

router.get('/users/:userId',getUser)




export default router;