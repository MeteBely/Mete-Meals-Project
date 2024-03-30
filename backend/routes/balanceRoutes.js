import express from 'express';
import { admin, protect } from '../middleware/authMiddleware.js';
import { getBalance, updateToUserBalance } from '../controllers/balanceController.js';
const router = express.Router();

router.route('/').get(protect, getBalance).put(protect, updateToUserBalance);
export default router;
