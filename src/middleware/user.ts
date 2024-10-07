import { body } from 'express-validator';
import User from '../models/user';

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
    .withMessage('Please enter a valid phone number.')
    .custom(async (value) => {
      const existingUser = await User.findOne({ phone: value });
      if (existingUser) {
        return Promise.reject('Phone number already exists!');
      }
    }),

  body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom(async (value) => {
      const existingUser = await User.findOne({ email: value });
      if (existingUser) {
        return Promise.reject('E-Mail address already exists!');
      }
    })
    .normalizeEmail(),

  body('password')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.')
];

export default userValidator;