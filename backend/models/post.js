import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  confessionTitle: { type: String, required: true }, // Title of the confession
  confessionText: { type: String, required: true }, // Main text of the confession
  confessionCategory: { type: String, required: true }, // Category of the confession
  confessionEmail: { type: String }, // Optional email address associated with the confession
  confessionAttachment: { type: String }, // URL or path to any attached file or image
  date: { type: Date, default: Date.now }, // Date of the confession post, defaults to current date
});

const Post = mongoose.model('Post', postSchema);
export default Post;
