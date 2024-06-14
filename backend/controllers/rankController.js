import User from '../models/user.js';

// Function to calculate ranks for all users
const calculateRanks = async () => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Calculate rank for each user based on criteria
    users.forEach(async (user) => {
      const points = user.points || 0;
      const completedChallenges = user.completedChallenges.length || 0;
      const activeChallenges = user.activeChallenges.length || 0;


      // Example calculation (you can adjust weights or add more criteria)
      const rank = points + completedChallenges * 10 + activeChallenges * 5;

      // Update user's rank in the database
      await User.findByIdAndUpdate(user._id, { rank });
    });

    console.log('Rank calculation completed.');
  } catch (error) {
    console.error('Error calculating rank:', error);
    throw error; // Propagate the error for handling
  }
};

// Function to fetch leaderboard (sorted by rank)
export const fetchLeaderboard = async (req, res) => {
  try {
    // Recalculate ranks before fetching leaderboard
    await calculateRanks();

    // Fetch leaderboard sorted by rank descending
    const leaderboard = await User.find()
      .sort({ rank: 'desc' });


    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Function to fetch all users
export const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

