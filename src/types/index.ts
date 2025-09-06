export interface CreateUserDTO {
    email: string;
    password: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface JWTPayload {
    userId: string;
    email: string;
}

export interface AuthRequest extends Express.Request {
    userId?: string;
}