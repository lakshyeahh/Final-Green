import User from '../models/user.js';
import Badge from '../models/badge.js';

// Get the leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find()
      .sort({ points: -1 })
      .select('name points')
      .limit(10);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard', error });
  }
};

// List badges and achievements
export const listBadges = async (req, res) => {
  try {
    const badges = await Badge.find();
    res.status(200).json(badges);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching badges', error });
  }
};
