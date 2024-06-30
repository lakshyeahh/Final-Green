import User from '../models/user.js';

// Get user profile and dashboard data
export const getUserProfile = async (req, res) => {
  const id = req.user._id;

  try {
    // Fetch all users from the database
    const users = await User.find();

    // Calculate rank for each user based on criteria
    await Promise.all(users.map(async (user) => {
      const points = user.points || 0;
      const completedChallenges = user.completedChallenges.length || 0;
      const activeChallenges = user.activeChallenges.length || 0;

      // Example calculation (you can adjust weights or add more criteria)
      const rank = points + completedChallenges * 10 + activeChallenges * 5;

      // Update user's rank in the database
      await User.findByIdAndUpdate(user._id, { rank });
    }));

    // Fetch the updated user
    const updatedUser = await User.findById(id).populate('badges');
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Sort users by rank in descending order
    const sortedUsers = await User.find().sort({ rank: -1 });

    // Find the position of the user in the sorted list
    const position = sortedUsers.findIndex(user => user._id.toString() === id.toString()) + 1;

    // Return the user profile and their position
    res.status(200).json({ user: updatedUser, position });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error });
  }
};
// Update user profile
export const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const { name, profileImage, points, badges } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, profileImage, points, badges },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user profile', error });
  }
};
