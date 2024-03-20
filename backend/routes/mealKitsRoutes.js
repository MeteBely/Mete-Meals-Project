import express from 'express';
import { getMealKits, getMealKitById, createMealKit, updateMealKit } from '../controllers/mealKitController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(getMealKits).post(protect, admin, createMealKit);
router.route('/:id').get(getMealKitById).put(protect, admin, updateMealKit);

export default router;
