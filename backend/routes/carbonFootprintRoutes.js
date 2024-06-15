import express from 'express';
import {
    calculateCarbonFootprint,
    getRecentCarbonFootprint,
    getHistoricalCarbonFootprints,
  getContributionData,
  compareWithOthers,
   
    getCarbonFootprintHistory
} from '../controllers/carbonFootprintController.js';
import auth from '../middleware/auth.js'; // Assuming you have an auth middleware

const router = express.Router();

router.post('/', auth, calculateCarbonFootprint);
router.get('/recent', auth, getRecentCarbonFootprint);
router.get('/historical', auth, getHistoricalCarbonFootprints);
router.get('/contribution', auth, getContributionData);
router.get('/compare', auth, compareWithOthers);
router.get('/', auth, getCarbonFootprintHistory);

export default router;
