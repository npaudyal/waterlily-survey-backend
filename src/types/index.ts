export interface JWTPayload {
    userId: string;
    email: string;
}

export interface AuthRequest extends Express.Request {
    userId?: string;
}