import express from 'express';
import {
    listChallenges,
    createChallenge,
    getChallengeDetails,
    joinChallenge,
    getActiveChallengesForUser,
    getUserChallenges,
    getChallengeDetailsForUser,
    submitChallengeInput,
    completeChallenge,
    verifyStep,
    getCompletedChallenges
} from '../controllers/challengeController.js';
import auth from '../middleware/auth.js'; // Assuming you have an auth middleware


const router = express.Router();

router.get('/', listChallenges);
router.post('/',  createChallenge);
router.get('/:challengeId', getChallengeDetails);
router.post('/:challengeId/join', auth, joinChallenge)
router.get('/user', auth, getUserChallenges);
router.post('/active', auth, getActiveChallengesForUser);
router.post('/complete', auth, getCompletedChallenges);
router.post('/active/:challengeId', auth, getChallengeDetailsForUser); // New route for user progress
router.patch('/submit/:challengeId', auth, submitChallengeInput);
router.patch('/verify/:challengeId', verifyStep);
router.patch('/:challengeId/complete', auth, completeChallenge); // New route for updating challenge progress

export default router;
