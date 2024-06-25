import express from 'express';
import {
    listChallenges,
    createChallenge,
    getChallengeDetails,
    joinChallenge,
    getChallengeProgress,
    getUserChallenges,
     // Assuming the correct spelling
    updateChallenge
} from '../controllers/challengeController.js';
import auth from '../middleware/auth.js'; // Assuming you have an auth middleware

const router = express.Router();

router.get('/', listChallenges);
router.post('/', auth, createChallenge);
router.get('/:challengeId', getChallengeDetails);
router.post('/:challengeId/join', auth, joinChallenge);

router.get('/user', auth, getUserChallenges);
router.get('/:challengeId/user-progress', auth, getChallengeProgress); // New route for user progress
router.patch('/:challengeId/update', auth, updateChallenge); // New route for updating challenge progress

export default router;
