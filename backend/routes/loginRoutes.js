import express from 'express';
const router = express.Router();

import loginController from '../controllers/auth/loginController.js';
import auth from '../middleware/auth.js';


router.post('/', loginController.login);

router.post('/logout', auth, loginController.logout);



export default router;