import express from 'express';
import { listSuggestions, submitSuggestion } from '../controllers/suggestionController.js';

const router = express.Router();

router.get('/suggestions', listSuggestions);
router.post('/suggestions', submitSuggestion);

export default router;
