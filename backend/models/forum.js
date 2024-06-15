import mongoose from 'mongoose';

const forumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
});

const Forum = mongoose.model('Forum', forumSchema);
export default Forum;
