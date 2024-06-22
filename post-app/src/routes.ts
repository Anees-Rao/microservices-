import express from 'express';
import { verifyToken } from './middleware/auth.middleware';
import PostController from './controllers/post.controller';

const router = express.Router();

// Create post route (protected with JWT verification middleware)
router.post('/create', verifyToken, PostController.createPost);
router.get('/list', verifyToken, PostController.listPosts);

export default router;
