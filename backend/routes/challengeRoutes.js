import express from 'express';
import {
    listChallenges,
    createChallenge,
    getChallengeDetails,
    joinChallenge,
    getChallengeProgress,
    getUserChallenges
} from '../controllers/challengeController.js';
import auth from '../middleware/auth.js'; // Assuming you have an auth middleware

const router = express.Router();

router.get('/', listChallenges);
router.post('/', auth, createChallenge);
router.get('/:challengeId', getChallengeDetails);
router.post('/:challengeId/join', auth, joinChallenge);
router.get('/:challengeId/progress', auth, getChallengeProgress);
router.get('/user', auth, getUserChallenges);

export default router;
