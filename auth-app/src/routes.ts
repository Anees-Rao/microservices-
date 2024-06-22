import { Router } from 'express';
import UserController from './controllers/user.controller';

const router = Router();

// Define routes
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.post('/verify-jwt', UserController.verifyJwt);

export default router;
