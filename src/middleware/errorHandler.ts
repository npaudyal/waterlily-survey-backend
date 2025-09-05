import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/errors';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: err.message,
            status: 'error'
        });
    }

    console.error('Unexpected error:', err);

    const message = process.env.NODE_ENV === 'development'
        ? err.message
        : 'Something went wrong';

    res.status(500).json({
        error: message,
        status: 'error'
    });
};

export const asyncHandler = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};