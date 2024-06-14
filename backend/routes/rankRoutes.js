import express from 'express';
const router = express.Router();
import {  fetchLeaderboard, fetchAllUsers } from '../controllers/rankController.js'

// Calculate ranks for all users
// router.get('/calculateRanks', async (req, res) => {
//   try {
//     await calculateRanks();
//     res.status(200).json({ message: 'Rank calculation completed.' });
//   } catch (error) {
//     console.error('Error calculating ranks:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// Fetch leaderboard (sorted by rank)
router.get('/', fetchLeaderboard);

// Fetch all users
router.get('/users', fetchAllUsers);

export default router;
