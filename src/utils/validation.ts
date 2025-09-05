export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; message?: string } => {
    if (password.length < 6) {
        // I am keeping basic for now
        return { valid: false, message: 'Password must be at least 6 characters long' };
    }
    return { valid: true };
};
