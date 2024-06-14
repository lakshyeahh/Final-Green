import express from 'express';
import { getLeaderboard, listBadges } from '../controllers/badgeController.js';

const router = express.Router();

router.get('/leaderboard', getLeaderboard);
router.get('/badges', listBadges);

export default router;
