import { body } from 'express-validator';

export const updateBalanceValidator = [
    body('amount')
        .isNumeric().withMessage('Amount must be a number'),
    body('userId')
        .isInt().withMessage('User ID must be an integer')
];