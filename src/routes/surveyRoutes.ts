import { requireAuth } from "@clerk/express";
import { Router } from "express";
import { getActiveSurvey, submitSurvey, getUserSubmission } from "@/controllers/surveyController";

const router = Router();

router.get('/active', getActiveSurvey);
router.post('/submit', requireAuth(), submitSurvey);
router.get('/submission', requireAuth(), getUserSubmission);

export default router;