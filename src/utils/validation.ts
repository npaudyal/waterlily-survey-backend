export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; message?: string; errors?: string[] } => {
    const errors: string[] = [];
    
    // Check minimum length
    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }
    
    // Check maximum length (prevent DoS attacks)
    if (password.length > 128) {
        errors.push('Password must not exceed 128 characters');
    }
    
    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }
    
    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }
    
    // Check for at least one digit
    if (!/\d/.test(password)) {
        errors.push('Password must contain at least one number');
    }
    
    // Check for at least one special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.push('Password must contain at least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)');
    }
    
    // Check for no spaces
    if (/\s/.test(password)) {
        errors.push('Password must not contain spaces');
    }
    
    // Check for common weak patterns
    const weakPatterns = [
        /(.)\1{2,}/, // Three or more repeated characters
        /123456|654321|qwerty|password|admin|letmein/i, // Common weak passwords
        /^[a-zA-Z]+$/, // Only letters
        /^\d+$/, // Only numbers
    ];
    
    for (const pattern of weakPatterns) {
        if (pattern.test(password)) {
            if (pattern === weakPatterns[0]) {
                errors.push('Password must not contain more than 2 consecutive identical characters');
            } else if (pattern === weakPatterns[1]) {
                errors.push('Password contains common weak patterns');
            }
            break;
        }
    }
    
    if (errors.length > 0) {
        return { 
            valid: false, 
            message: errors[0], // Return first error for backward compatibility
            errors 
        };
    }
    
    return { valid: true };
};

// Helper function to get all password requirements for display
export const getPasswordRequirements = (): string[] => {
    return [
        'At least 8 characters long',
        'At least one lowercase letter (a-z)',
        'At least one uppercase letter (A-Z)',
        'At least one number (0-9)',
        'At least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)',
        'No spaces allowed',
        'No more than 2 consecutive identical characters',
        'Must not contain common weak patterns'
    ];
};
