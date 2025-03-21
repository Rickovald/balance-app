import { HTTPError } from '#types.js';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: HTTPError, req: Request, res: Response, next: NextFunction) => {
    console.error(`Error occurred at ${req.method} ${req.url}:`, err);

    if (err.status) {
        console.log('anal', err);

        return res.status(err.status).json({
            errors: err.errors,
            message: err.message
        });
    }

    res.status(500).json({
        errors: [err.message],
        message: 'Internal Server Error',
    });
    next(err);
};
