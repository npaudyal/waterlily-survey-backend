import { Request, Response, NextFunction } from 'express';
import { validateEmail, validatePassword } from '@/utils/validation';

export const validateRegistration = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
        return res.status(400).json({ error: passwordValidation.message });
    }

    next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    next();
};

export const validateSurveySubmission = (req: Request, res: Response, next: NextFunction) => {
    const { surveyId, answers } = req.body;

    if (!surveyId) {
        return res.status(400).json({ error: 'Survey ID is required' });
    }

    if (!answers || !Array.isArray(answers)) {
        return res.status(400).json({ error: 'Answers must be provided as an array' });
    }

    next();
};