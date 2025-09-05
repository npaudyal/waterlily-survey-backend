import { prisma } from "@/config/database";
import { Request, Response } from "express";

export default async function authController(req: any, res: Response) {

    try {

        const userId = req.auth.userId;
        let user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    id: userId,
                    email: `user_${userId}@clerk.com`,
                    passwordHash: 'managed-by-prisma'
                }
            });
        }

        res.json({
            id: user.id,
            email: user.email,
            createdAt: user.createdAt
        });
    } catch (error) {
        console.error('Error in /me', error);
        res.status(500).json({ error: 'Failed to get the user information' });
    }
}