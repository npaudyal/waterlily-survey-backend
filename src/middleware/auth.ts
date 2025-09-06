import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '@/utils/jwt';
import { UnauthorizedError } from '@/utils/errors';

interface AuthRequest extends Request {
    userId?: string;
    userEmail?: string;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.accessToken;

        if (!token) {
            throw new UnauthorizedError('No token provided');
        }

        const decoded = verifyAccessToken(token);
        req.userId = decoded.userId;
        req.userEmail = decoded.email;

        next();
    } catch (error) {
        if (error instanceof UnauthorizedError) {
            res.status(401).json({ error: error.message });
        } else {
            res.status(401).json({ error: 'Invalid or expired token' });
        }
    }
};

export const optionalAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.accessToken;

        if (token) {
            const decoded = verifyAccessToken(token);
            req.userId = decoded.userId;
            req.userEmail = decoded.email;
        }

        next();
    } catch {
        // If token is invalid, continue without authentication
        next();
    }
};