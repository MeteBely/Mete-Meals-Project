import express from 'express';
import { getGiftCardById, getGiftCards, createGiftCard, PayToGiftCardOrder } from '../controllers/giftCardController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(protect, admin, getGiftCards).post(createGiftCard);
router.route('/:id').get(protect, getGiftCardById);
router.route('/pay').post(PayToGiftCardOrder);
export default router;
