import { Request, Response } from 'express';
import { surveyService } from '@/services/surveyService';
import { asyncHandler } from '@/middleware/errorHandler';

interface AuthRequest extends Request {
    userId?: string;
    userEmail?: string;
}

export class SurveyController {
    getSurvey = asyncHandler(async (req: Request, res: Response) => {
        const { active } = req.query;
        const isActive = active === 'true' ? true : active === 'false' ? false : undefined;

        const surveys = await surveyService.getActiveSurvey(isActive);

        res.status(200).json({
            data: surveys
        });
    });


    submitSurvey = asyncHandler(async (req: AuthRequest, res: Response) => {
        const userId = req.userId!;
        const { surveyId, answers } = req.body;

        const submission = await surveyService.createSubmission(userId, surveyId, answers);

        res.status(201).json({
            message: 'Survey submitted successfully',
            data: submission
        });
    });


    getUserSubmissions = asyncHandler(async (req: AuthRequest, res: Response) => {
        const userId = req.userId!;
        const submissions = await surveyService.getUserSubmissions(userId);

        res.status(200).json({
            data: submissions
        });
    });
}

export const surveyController = new SurveyController();