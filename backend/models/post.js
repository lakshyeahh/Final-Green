import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  forumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Forum', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  comments: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String },
    date: { type: Date, default: Date.now },
  }],
});

const Post = mongoose.model('Post', postSchema);
export default Post;
