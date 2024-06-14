import express from 'express';
import {
    getWasteManagementLocations,
    getWasteManagementSchedule,
} from '../controllers/wasteManagementController.js';

const router = express.Router();

// Route to get recycling and waste disposal locations
router.get('/locations', getWasteManagementLocations);

// Route to get waste collection schedules
router.get('/schedule', getWasteManagementSchedule);

export default router;
