import { prisma } from "@/config/database";
import { Request, Response } from "express";

export async function getActiveSurvey(req: Request, res: Response) {
    try {
        const survey = await prisma.survey.findFirst({
            where: { isActive: true },
            include: {
                sections: {
                    include: {
                        questions: {
                            orderBy: { order: 'asc' }
                        }
                    },
                    orderBy: { order: 'asc' }
                }
            }
        });

        if (!survey) {
            return res.status(404).json({ error: 'No active survey found' });
        }

        res.json(survey);

    } catch (error) {
        res.status(500).json({ error: 'Failed to get survey data.' })
    }
}

export async function submitSurvey(req: any, res: Response) {

    try {

        const { surveyId, answers } = req.body;
        const userId = req.auth.userId;

        if (!surveyId || !answers) {
            return res.status(400).json({ error: 'Invalid request data' })
        }

        const existing = await prisma.submission.findFirst({
            where: { userId, surveyId }
        });

        if (existing) {
            return res.status(400).json({ error: 'Already submitted this survey' })
        }

        const submission = await prisma.submission.create({
            data: {
                userId,
                surveyId,
                answers: {
                    create: answers.map((ans: any) => ({
                        questionId: ans.questionId,
                        value: ans.value
                    })
                    )
                }

            }
        });

        res.json({
            message: 'Survey successfully submitted',
            submissionId: submission.id
        })

    } catch (error) {
        res.status(500).json({ error: 'Failed to submit the survey' })
    }
}


export async function getUserSubmission(req: any, res: Response) {
    try {

        const userId = req.auth.userId;
        const { surveyId } = req.query;

        const submission = await prisma.submission.findFirst({
            where: {
                userId,
                ...(surveyId && { surveyId })
            },
            include: {
                survey: {
                    include: {
                        sections: {
                            include: {
                                questions: true
                            },
                            orderBy: { order: 'asc' },
                        }
                    }
                },
                answers: {
                    include: { question: true },
                }
            },
            orderBy: { createdAt: 'desc' }

        });

        if (!submission) {
            return res.status(404).json({ error: 'No submission found' })
        }

        res.json(submission)

    } catch (error) {
        res.status(500).json({ error: 'Failed to get your submission' })
    }
}