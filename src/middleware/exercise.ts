import { body } from 'express-validator';
import User from '../models/user';

const exerciseValidator = [
    body('name')
    .trim()
    .notEmpty()
    .withMessage('name is required.')
    .isAlpha()
    .withMessage('name should contain only letters.')
    .isLength({ max:30 })
    .withMessage('name is to long'),

    body('description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('description is required.')
    .isAlpha()
    .withMessage('description should contain only letters.')
    .isLength({ max:100 })
    .withMessage('name is to long'),

    body('sets')
    .trim()
    .notEmpty()
    .withMessage('Number of sets is required.')
    .custom(value => {
        if (+value >= 10) {
          return Promise.reject('The number must be smaller than 10');
        }
        return true
    }),
    
    body('times')
    .trim()
    .notEmpty()
    .withMessage('Number of times is required.')
    // .isNumeric()
    .withMessage('Number of times should contain only number.')
    .custom(value => {
        if (+value >= 100) {
           return Promise.reject('The number must be smaller than 100');
        }
        return true
    }),


    body('category')
    .trim()
    .notEmpty()
    .withMessage('category is required.')
    .isAlpha()
    .withMessage('category should contain only letters.')
]


export default exerciseValidator;