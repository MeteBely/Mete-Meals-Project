import express from 'express';
import { getMealKits, getMealKitById } from '../controllers/mealKitController.js';
const router = express.Router();

router.route('/').get(getMealKits);
router.route('/:id').get(getMealKitById);

export default router;
