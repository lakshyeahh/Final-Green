import express from 'express';
import {
    getEnergyUsage,
    getWaterUsage,
    createUsageEntry,
} from '../controllers/usageController.js';

const router = express.Router();

// Route to get campus energy usage data
router.get('/energy', getEnergyUsage);

// Route to get campus water usage data
router.get('/water', getWaterUsage);

// Route to create a new usage entry
router.post('/', createUsageEntry);

export default router;
