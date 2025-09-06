import { Request, Response } from 'express';
import { asyncHandler } from '@/middleware/errorHandler';
import { authService } from '@/services/authService';

interface AuthRequest extends Request {
    userId?: string;
    userEmail?: string;
}

export class AuthController {
    register = asyncHandler(async (req: Request, res: Response) => {
        const result = await authService.register(req.body);

        // Set cookies
        res.cookie('accessToken', result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(201).json({
            message: 'User registered successfully',
            data: {
                user: result.user
            }
        });
    });

    login = asyncHandler(async (req: Request, res: Response) => {
        const result = await authService.login(req.body);

        // Set cookies
        res.cookie('accessToken', result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            message: 'Login successful',
            data: {
                user: result.user
            }
        });
    });

    logout = asyncHandler(async (req: Request, res: Response) => {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        res.status(200).json({
            message: 'Logged out successfully'
        });
    });

    refresh = asyncHandler(async (req: Request, res: Response) => {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(401).json({
                error: 'No refresh token provided'
            });
        }

        const result = await authService.refreshTokens(refreshToken);

        // Set new cookies
        res.cookie('accessToken', result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            message: 'Tokens refreshed successfully'
        });
    });

    getProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
        const userId = req.userId!;
        const user = await authService.getProfile(userId);

        res.status(200).json({
            data: user
        });
    });

    validateToken = asyncHandler(async (req: AuthRequest, res: Response) => {
        res.status(200).json({
            valid: true,
            userId: req.userId,
            email: req.userEmail
        });
    });
}

export const authController = new AuthController();