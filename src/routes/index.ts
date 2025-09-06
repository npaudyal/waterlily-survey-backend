import { Router } from 'express';
import authRoutes from '@/routes/authRoutes';
import surveyRoutes from '@/routes/surveyRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/survey', surveyRoutes);

export default router;