import User from '../models/user.js';

// Get user profile and dashboard data
export const getUserProfile = async (req, res) => {

  const id = req.user._id;
  
  try {
    const user = await User.findById(id).populate('badges');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
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
