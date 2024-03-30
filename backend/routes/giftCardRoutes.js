import express from 'express';
import { getGiftCardByIdAndDelete, getGiftCards, createGiftCard, PayToGiftCardOrder } from '../controllers/giftCardController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(protect, admin, getGiftCards).post(createGiftCard);
router.route('/:id').delete(protect, getGiftCardByIdAndDelete);
router.route('/pay').post(PayToGiftCardOrder);
export default router;
