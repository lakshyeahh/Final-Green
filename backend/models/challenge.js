import mongoose from 'mongoose';

const stepSchema = new mongoose.Schema({
  stepNumber: { type: Number, required: true },
  description: { type: String, required: true },
  inputType: { type: String, enum: ['text', 'file', 'image', 'video'], required: true } // Enum for input types
});

// Schema for participant details
const participantDetailsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  details: [{
    stepNumber: { type: Number, required: true },
    inputGiven: { type: mongoose.Schema.Types.Mixed }, // Mixed type for flexibility in input content
    verified: { type: Boolean, default: false }
  }]
});

// Challenge schema with modifications
const challengeSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  participants: [participantDetailsSchema], // Updated participants to use participantDetailsSchema
  steps: [stepSchema], // Updated steps to include inputType for each step
  points: { type: Number, required: true }
});

const Challenge = mongoose.model('Challenge', challengeSchema);
export default Challenge;
