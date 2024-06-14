import express from 'express';
import { listEvents, createEvent, getEvent, registerEvent } from '../controllers/eventController.js';

const router = express.Router();

router.get('/', listEvents);
router.post('/', createEvent);
router.get('/:id', getEvent);
router.post('/:id/register', registerEvent);

export default router;
