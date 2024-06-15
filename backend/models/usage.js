import mongoose from 'mongoose';

const usageSchema = new mongoose.Schema({
  type: { type: String, enum: ['energy', 'water'], required: true },
  date: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
});

const Usage = mongoose.model('Usage', usageSchema);
export default Usage;
