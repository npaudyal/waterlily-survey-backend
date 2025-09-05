import jwt from 'jsonwebtoken';
import { JWTPayload } from '@/types';

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET || 'greatest-token-ever';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'greatest-refresh-token-ever';
const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

export const generateAccessToken = (payload: JWTPayload): string => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
};

export const generateRefreshToken = (payload: JWTPayload): string => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
};

export const verifyAccessToken = (token: string): JWTPayload => {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as JWTPayload;
};

export const verifyRefreshToken = (token: string): JWTPayload => {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as JWTPayload;
};

export const decodeToken = (token: string): JWTPayload | null => {
    try {
        return jwt.decode(token) as JWTPayload;
    } catch {
        return null;
    }
};