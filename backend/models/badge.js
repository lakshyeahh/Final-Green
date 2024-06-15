import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
});

const Badge = mongoose.model('Badge', badgeSchema);
export default Badge;
