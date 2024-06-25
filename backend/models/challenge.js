import mongoose from 'mongoose';

const stepSchema = new mongoose.Schema({
  stepNumber: { type: Number, required: true },
  description: { type: String, required: true }
});

const challengeSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  progress: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    stepNumber: { type: Number, required: true },
    completed: { type: Boolean, default: false },
  }],
  steps: [stepSchema],
  points: { type: Number, required: true }
});

const Challenge = mongoose.model('Challenge', challengeSchema);
export default Challenge;
