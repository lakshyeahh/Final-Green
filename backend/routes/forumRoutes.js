import express from 'express';
import {
  listForums,
  createForum,
  getForumDetails,
  createPost
} from '../controllers/forumController.js';

const router = express.Router();

router.get('/forums', listForums);
router.post('/forums', createForum);
router.get('/forums/:id', getForumDetails);
router.post('/forums/:id/posts', createPost);

export default router;
