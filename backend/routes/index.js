// routes/index.js

import express from 'express';
import loginRoutes from './loginRoutes.js';
import registerRoutes from './registerRoutes.js';
import usersRoutes from './userRoutes.js';
import challengesRoutes from './challengeRoutes.js';
import carbonFootprintRoutes from './carbonFootprintRoutes.js';
import wasteManagementRoutes from './wasteManagementRoutes.js';
import usageRoutes from './usageRoutes.js';
import educationRoutes from './resourceRoutes.js';
import eventsRoutes from './eventRoutes.js';
import notificationsRoutes from './notificationRoutes.js';
import socialRoutes from './forumRoutes.js';
import gamificationRoutes from './badgeRoutes.js';
import feedbackRoutes from './suggestionRoutes.js';
import rankRoutes from './rankRoutes.js'

const router = express.Router();

router.use('/register', registerRoutes);
router.use('/login', loginRoutes);
router.use('/users', usersRoutes);
router.use('/challenges', challengesRoutes);
router.use('/carbon-footprint', carbonFootprintRoutes);
router.use('/waste-management', wasteManagementRoutes);
router.use('/usage', usageRoutes);
router.use('/education', educationRoutes);
router.use('/events', eventsRoutes);
router.use('/notifications', notificationsRoutes);
router.use('/social', socialRoutes);
router.use('/gamification', gamificationRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/leaderboard', rankRoutes)

export default router;
