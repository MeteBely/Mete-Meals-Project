import express from 'express';
import { payToMembership } from '../controllers/membershipController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
const router = express.Router();

// router.route('/').get(protect, admin, getGiftCards).post(createGiftCard);
// router.route('/:id').delete(protect, getGiftCardByIdAndDelete);
router.route('/pay').post(protect, payToMembership);
export default router;
