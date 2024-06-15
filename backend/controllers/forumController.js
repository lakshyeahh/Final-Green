import Forum from '../models/forum.js';
import Post from '../models/post.js';

// List discussion forums
export const listForums = async (req, res) => {
  try {
    const forums = await Forum.find().populate('posts');
    res.status(200).json(forums);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching forums', error });
  }
};

// Create a new forum
export const createForum = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newForum = new Forum({ title, description });
    await newForum.save();
    res.status(201).json(newForum);
  } catch (error) {
    res.status(500).json({ message: 'Error creating forum', error });
  }
};

// Get details of a specific forum
export const getForumDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const forum = await Forum.findById(id).populate({
      path: 'posts',
      populate: { path: 'userId', select: 'name' }
    });
    if (!forum) {
      return res.status(404).json({ message: 'Forum not found' });
    }
    res.status(200).json(forum);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching forum details', error });
  }
};

// Create a new post in a forum
export const createPost = async (req, res) => {
  const { id } = req.params;
  const { userId, content } = req.body;
  try {
    const newPost = new Post({ forumId: id, userId, content });
    await newPost.save();
    const forum = await Forum.findByIdAndUpdate(
      id,
      { $push: { posts: newPost._id } },
      { new: true }
    );
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
};
