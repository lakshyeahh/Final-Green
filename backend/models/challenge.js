import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  progress: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    completed: { type: Boolean, default: false },
  }],
  points: { type: Number, required: false},
});

const Challenge = mongoose.model('Challenge', challengeSchema);
export default Challenge;
