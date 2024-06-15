import express from 'express';
import { listNotifications, createNotification } from '../controllers/notificationController.js';

const router = express.Router();

router.get('/', listNotifications);
router.post('/', createNotification);

export default router;
