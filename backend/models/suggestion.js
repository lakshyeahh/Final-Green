import mongoose from 'mongoose';

const suggestionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  suggestion: { type: String, required: true },
  date: { type: Date, default: Date.now },
  votes: { type: Number, default: 0 },
});

const Suggestion = mongoose.model('Suggestion', suggestionSchema);
export default Suggestion;
