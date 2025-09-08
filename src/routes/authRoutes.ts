import { Router } from 'express';
import { authController } from '../controllers/authController';
import { validateRegistration, validateLogin } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';
import { getPasswordRequirements } from '../utils/validation';

const router = Router();

// Public routes
router.get('/password-requirements', (req, res) => {
    res.json({ requirements: getPasswordRequirements() });
});
router.post('/register', validateRegistration, authController.register);
router.post('/login', validateLogin, authController.login);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refresh);

// Protected routes
router.get('/profile', authenticateToken, authController.getProfile);
router.get('/validate', authenticateToken, authController.validateToken);

export default router;