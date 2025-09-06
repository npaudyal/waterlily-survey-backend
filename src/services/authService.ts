import { prisma } from '@/config/database';
import { hashPassword, comparePassword } from '@/utils/password';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '@/utils/jwt';
import { CreateUserDTO, LoginDTO } from '@/types';
import { ConflictError, UnauthorizedError } from '@/utils/errors';

export class AuthService {
    async register(userData: CreateUserDTO) {
        const { email, password } = userData;

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            throw new ConflictError('User with this email already exists');
        }

        const passwordHash = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                email,
                passwordHash
            },
            select: {
                id: true,
                email: true,
                createdAt: true
            }
        });

        const accessToken = generateAccessToken({
            userId: user.id,
            email: user.email
        });

        const refreshToken = generateRefreshToken({
            userId: user.id,
            email: user.email
        });

        return {
            user,
            accessToken,
            refreshToken
        };
    }

    async login(loginData: LoginDTO) {
        const { email, password } = loginData;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            throw new UnauthorizedError('Invalid email or password');
        }

        const isPasswordValid = await comparePassword(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new UnauthorizedError('Invalid email or password');
        }

        const accessToken = generateAccessToken({
            userId: user.id,
            email: user.email
        });

        const refreshToken = generateRefreshToken({
            userId: user.id,
            email: user.email
        });

        return {
            user: {
                id: user.id,
                email: user.email,
                createdAt: user.createdAt
            },
            accessToken,
            refreshToken
        };
    }

    async getProfile(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                createdAt: true,
                _count: {
                    select: {
                        submissions: true
                    }
                }
            }
        });

        if (!user) {
            throw new UnauthorizedError('User not found');
        }

        return user;
    }

    async refreshTokens(refreshToken: string) {
        try {
            const payload = verifyRefreshToken(refreshToken);

            const user = await prisma.user.findUnique({
                where: { id: payload.userId }
            });

            if (!user) {
                throw new UnauthorizedError('User not found');
            }

            const newAccessToken = generateAccessToken({
                userId: user.id,
                email: user.email
            });

            const newRefreshToken = generateRefreshToken({
                userId: user.id,
                email: user.email
            });

            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            };
        } catch (error) {
            throw new UnauthorizedError('Invalid refresh token');
        }
    }
}

export const authService = new AuthService();