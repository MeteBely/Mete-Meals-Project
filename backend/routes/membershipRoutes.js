import express from 'express';
import { payToMembership, createMembership } from '../controllers/membershipController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').post(protect, createMembership);
// router.route('/:id').delete(protect, getGiftCardByIdAndDelete);
router.route('/pay').post(protect, payToMembership);
export default router;
