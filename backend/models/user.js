import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  profileImage: { type: String },
  points: { type: Number, default: 0 },
  badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }],
  activeChallenges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' }], // New field for active challenge IDs
  completedChallenges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' }], // New field for completed challenge IDs
  rank: { type: Number, default: 0 }, // New field for user rank
});

const User = mongoose.model('User', userSchema);
export default User;
