import { Request, Response } from 'express';
import { asyncHandler } from '@/middleware/errorHandler';
import { authService } from '@/services/authService';
import { getCookieConfig, ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from '@/utils/cookie-config';

interface AuthRequest extends Request {
    userId?: string;
    userEmail?: string;
}

export class AuthController {
    register = asyncHandler(async (req: Request, res: Response) => {
        const result = await authService.register(req.body);

        res.cookie('accessToken', result.accessToken, getCookieConfig(ACCESS_TOKEN_MAX_AGE));
        res.cookie('refreshToken', result.refreshToken, getCookieConfig(REFRESH_TOKEN_MAX_AGE));

        res.status(201).json({
            message: 'User registered successfully',
            data: {
                user: result.user
            }
        });
    });

    login = asyncHandler(async (req: Request, res: Response) => {
        const result = await authService.login(req.body);

        res.cookie('accessToken', result.accessToken, getCookieConfig(ACCESS_TOKEN_MAX_AGE));
        res.cookie('refreshToken', result.refreshToken, getCookieConfig(REFRESH_TOKEN_MAX_AGE));

        res.status(200).json({
            message: 'Login successful',
            data: {
                user: result.user
            }
        });
    });

    logout = asyncHandler(async (req: Request, res: Response) => {
        const cookieOptions = getCookieConfig(0);
        res.clearCookie('accessToken', { ...cookieOptions, maxAge: 0 });
        res.clearCookie('refreshToken', { ...cookieOptions, maxAge: 0 });

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

        res.cookie('accessToken', result.accessToken, getCookieConfig(ACCESS_TOKEN_MAX_AGE));
        res.cookie('refreshToken', result.refreshToken, getCookieConfig(REFRESH_TOKEN_MAX_AGE));

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
        const user = await authService.getProfile(req.userId!);

        res.status(200).json({
            valid: true,
            userId: req.userId,
            email: req.userEmail,
            name: user.name
        });
    });
}

export const authController = new AuthController();