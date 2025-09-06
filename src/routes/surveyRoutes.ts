import { Router } from "express";
import { surveyController } from "@/controllers/surveyController"
import { authenticateToken } from "@/middleware/auth";

const router = Router();

router.get('/active', surveyController.getSurvey);
router.post('/submit', authenticateToken, surveyController.submitSurvey);
router.get('/submission', authenticateToken, surveyController.getUserSubmissions);

export default router;