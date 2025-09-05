import { requireAuth } from "@clerk/express";
import { Router } from "express";
import authController from "@/controllers/authController";

const router = Router();

router.get('/me', requireAuth(), authController);

export default router;