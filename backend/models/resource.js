import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  type: { type: String, enum: ['article', 'video', 'guide'], required: true },
  category: { type: String, enum: ['clean', 'water', 'fuel', 'leaf'], required: true },
  authorName: { type: String, required: true },
  authorPosition: { type: String, required: true },
});

const Resource = mongoose.model('Resource', resourceSchema);
export default Resource;
