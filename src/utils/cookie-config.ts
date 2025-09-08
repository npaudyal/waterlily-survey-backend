import { CookieOptions } from 'express';

const isProduction = process.env.NODE_ENV === 'production';

// Cookie configuration for cross-domain authentication
export const getCookieConfig = (maxAge: number): CookieOptions => {
    const baseConfig: CookieOptions = {
        httpOnly: true,
        secure: isProduction,
        maxAge,
        path: '/',
    };
    if (isProduction) {
        return {
            ...baseConfig,
            sameSite: 'none', // Required for cross-domain cookies
            domain: undefined, // Let browser determine the domain
        };
    }

    return {
        ...baseConfig,
        sameSite: 'lax',
    };
};

export const ACCESS_TOKEN_MAX_AGE = 15 * 60 * 1000;
export const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000;