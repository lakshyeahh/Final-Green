import express from 'express';
import {
  getAllPosts,
  createForum,
  getForumDetails,
  createPost,
  generateSecretURL,
  sendGiftVoucher,
  sendMeetUpReward,
  sendSurpriseGiftReward
} from '../controllers/forumController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/forums', getAllPosts);
router.post('/forums', createForum);
router.get('/forums/:id', getForumDetails);
router.post('/forums/send-mail', generateSecretURL);
router.post('/forums/post', auth, createPost);
router.post('/forums/gift-voucher',  sendGiftVoucher);
router.post('/forums/meetup',  sendMeetUpReward);
router.post('/forums/surprise',  sendSurpriseGiftReward);



export default router;
