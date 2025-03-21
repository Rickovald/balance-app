import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

// Обработка ошибок валидации
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Создаем стандартную ошибку, типизируем её
        const error = new Error('Validation failed') as Error & { errors: unknown[]; status: number; };
        error.status = 400;
        error.errors = errors.array(); // Массив ошибок валидации
        next(error);
    }
    next();
};
