import { prisma } from '@/config/database';
import { NotFoundError, ValidationError } from '@/utils/errors';

export class SurveyService {
    async getActiveSurvey(isActive?: boolean) {
        const where = isActive !== undefined ? { isActive } : {};

        return prisma.survey.findMany({
            where,
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
    }

    async getSurveyById(surveyId: string) {
        const survey = await prisma.survey.findUnique({
            where: { id: surveyId },
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
            throw new NotFoundError('Survey not found');
        }

        return survey;
    }

    async createSubmission(userId: string, surveyId: string, answers: any[]) {
        const survey = await prisma.survey.findUnique({
            where: { id: surveyId },
            include: {
                sections: {
                    include: {
                        questions: true
                    }
                }
            }
        });

        if (!survey) {
            throw new NotFoundError('Survey not found');
        }

        const allQuestions = survey.sections.flatMap(section => section.questions);
        const requiredQuestions = allQuestions.filter(q => q.required);

        const answeredQuestionIds = answers.map(a => a.questionId);
        const missingRequired = requiredQuestions.filter(
            q => !answeredQuestionIds.includes(q.id)
        );

        if (missingRequired.length > 0) {
            throw new ValidationError(
                `Missing required answers for questions: ${missingRequired.map(q => q.text).join(', ')}`
            );
        }

        const submission = await prisma.submission.create({
            data: {
                userId,
                surveyId,
                status: 'COMPLETED',
                completedAt: new Date(),
                answers: {
                    create: answers.map(answer => ({
                        questionId: answer.questionId,
                        value: answer.value
                    }))
                }
            },
            include: {
                answers: {
                    include: {
                        question: true
                    }
                }
            }
        });

        return submission;
    }

    async getSubmission(submissionId: string, userId: string) {
        const submission = await prisma.submission.findFirst({
            where: {
                id: submissionId,
                userId
            },
            include: {
                survey: true,
                answers: {
                    include: {
                        question: {
                            include: {
                                section: true
                            }
                        }
                    }
                }
            }
        });

        if (!submission) {
            throw new NotFoundError('Submission not found');
        }

        return submission;
    }

    async getUserSubmissions(userId: string) {
        return prisma.submission.findMany({
            where: { userId },
            include: {
                survey: true,
                answers: {
                    include: {
                        question: {
                            include: {
                                section: true
                            }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async updateSubmission(submissionId: string, userId: string, answers: any[]) {
        const submission = await prisma.submission.findFirst({
            where: {
                id: submissionId,
                userId,
                status: 'DRAFT'
            }
        });

        if (!submission) {
            throw new NotFoundError('Submission not found or cannot be updated');
        }

        await prisma.answer.deleteMany({
            where: { submissionId }
        });

        const updated = await prisma.submission.update({
            where: { id: submissionId },
            data: {
                answers: {
                    create: answers.map(answer => ({
                        questionId: answer.questionId,
                        value: answer.value
                    }))
                },
                updatedAt: new Date()
            },
            include: {
                answers: {
                    include: {
                        question: true
                    }
                }
            }
        });

        return updated;
    }
}

export const surveyService = new SurveyService();