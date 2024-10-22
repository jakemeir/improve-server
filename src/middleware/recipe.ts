import { body } from 'express-validator';
import Recipe from '../models/recipe';

const recipeValidator = [
    body('name')
        .notEmpty().withMessage('Name is required.')
        .isString().withMessage('Name must be a string.')
        .isLength({ min: 3, max: 50 }).withMessage('Name must be between 3 and 50 characters.')
        .custom(async (value, { req }) => {
            const existingRecipe = await Recipe.findOne({ name: value, ingredients: { $all: req.body.ingredients }});
            if (existingRecipe && (!req.body.recipeId || req.body.recipeId !== existingRecipe._id.toString())) {
                return Promise.reject('A recipe with the same name and ingredients already exists!');
            }
            return true;
        }),
    body('description')
        .optional()
        .isString().withMessage('Description must be a string.')
        .isLength({ max: 200 }).withMessage('Description can be up to 200 characters long.'),
    body('ingredients')
        .isArray({ min: 1 }).withMessage('At least one ingredient is required.')
        .custom((value: string[]) => {
            value.forEach((ingredient: string) => {
                if (typeof ingredient !== 'string') {
                    throw new Error('Each ingredient must be a string.');
                }
            });
            return true;
        }),
    body('instruction')
        .notEmpty().withMessage('Instruction is required.')
        .isString().withMessage('Instruction must be a string.')
        .isLength({ min: 10 }).withMessage('Instruction must be at least 10 characters long.'),
];

export default recipeValidator;
