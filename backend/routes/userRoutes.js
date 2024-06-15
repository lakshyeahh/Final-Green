import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getUserProfile);
router.put('/:id', updateUserProfile);

export default router;
