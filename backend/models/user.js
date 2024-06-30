import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  profileImage: { type: String },
  points: { type: Number, default: 0 },
  badges: {
    type: [{
      type: Number,
      default: [1] // Default to badge index 1
    }]
  },
  activeChallenges: [{
    challenge: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', required: true },
    progress: { type: Number, default: 0, min: 0, max: 4 }  // Progress in percentage
  }],
  completedChallenges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' }],
  rank: { type: Number, default: 0 },
});

const User = mongoose.model('User', userSchema);
export default User;
