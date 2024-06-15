// Import required modules
import express from 'express';
import registerController from '../controllers/auth/registerController.js';

// Create an Express router
const router = express.Router();

// Define the route for handling POST requests to "/api/register"
router.post('/', registerController.register);

// Export the router
export default router;
