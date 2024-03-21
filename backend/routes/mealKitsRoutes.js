import express from 'express';
import { getMealKits, getMealKitById, createMealKit, updateMealKit, deleteMealKit, createMealKitReview } from '../controllers/mealKitController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(getMealKits).post(protect, admin, createMealKit);
router.route('/:id').get(getMealKitById).put(protect, admin, updateMealKit).delete(protect, admin, deleteMealKit);
router.route('/:id/reviews').post(protect, createMealKitReview);
export default router;
