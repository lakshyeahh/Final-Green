import express from 'express';
import { listResources, addResource, getResource } from '../controllers/resourceController.js';

const router = express.Router();

router.get('/resources', listResources);
router.post('/resources', addResource);
router.get('/resources/:id', getResource);

export default router;
